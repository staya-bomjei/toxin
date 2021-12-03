import $ from 'jquery';

import { choiceCountable } from '../../libs/utils/utils';
import MyAirDatepicker from '../../libs/air-datepicker/MyAirDatepicker';
import '../button/button';

import './dropdown.scss';

const DROPDOWN_SELECTOR = '.js-dropdown';
const DROPDOWNS_SELECTOR = '.js-dropdown__dropdowns';
const CONTENT_SELECTOR = '.js-dropdown__content';
const TEXT_SELECTOR = '.js-dropdown__text';
const CLEAR_BUTTON_SELECTOR = '.js-dropdown__clear-button';
const ACCEPT_BUTTON_SELECTOR = '.js-dropdown__accept-button';
const INPUT_BOX_SELECTOR = '.js-dropdown__input-box';
const ROW_SELECTOR = '.js-dropdown__row';
const MINUS_SELECTOR = '.js-dropdown__button-minus';
const COUNTER_SELECTOR = '.js-dropdown__counter';
const PLUS_SELECTOR = '.js-dropdown__button-plus';
const DROPDOWN_OPEN = 'dropdown_open';

class Dropdown {
  constructor($component) {
    this.placeholder = $component.attr('data-placeholder');
    this.valueChanged = $component.attr('data-value-changed');
    this.maxLen = Number($component.attr('data-max-len'));
    const type = $component.attr('data-type');
    this.isDatepicker = type === 'datepicker';
    this.isSummator = type === 'summator';
    this.hasControls = $component.has('data-has-controls') !== undefined;
    this.$component = $component;
    this.$dropdowns = $(DROPDOWNS_SELECTOR, $component);
    this.$content = $(CONTENT_SELECTOR, $component);

    if (this.isDatepicker) {
      this.texts = $(TEXT_SELECTOR, $component);
      this.isSplit = $component.attr('data-is-split') !== undefined;
      this.isRange = $component.attr('data-is-range') !== undefined;
      this.datepicker = this.createCalendar({ range: this.isRange });
      const selected = JSON.parse($component.attr('data-selected'));
      this.datepicker.selectDate(selected);
    } else {
      this.$text = $(TEXT_SELECTOR, $component);

      if (this.isSummator) {
        this.countables = JSON.parse($component.attr('data-countables'));
        this.rows = this.getRows();
      } else {
        this.rows = this.getRows();
      }

      this.updateText();

      if (this.hasControls) {
        this.$clear = $component.find(CLEAR_BUTTON_SELECTOR);
        this.$accept = $component.find(ACCEPT_BUTTON_SELECTOR);
        this.updateClearButtonVisability();
      }
    }
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(document).on('click', (event) => this.handleOutOfComponentClick(event));
    this.$dropdowns.on('click', (event) => this.handleDropdownsClick(event));

    if (!this.isDatepicker) {
      if (this.hasControls) {
        this.$clear.on('click', () => this.handleClearButtonClick());
        this.$accept.on('click', (event) => this.handleAcceptButtonClick(event));
      }

      this.rows.forEach((row) => {
        row.$minus.on('click', () => this.handleMinusClick(row.$minus, row.$counter));
        row.$plus.on('click', () => this.handlePlusClick(row.$minus, row.$counter));
      });
    }
  }

  handleOutOfComponentClick(event) {
    const { target } = event;
    if (this.$component.has(target).length === 0) {
      this.$component.removeClass(DROPDOWN_OPEN);
    }
  }

  handleDropdownsClick(event) {
    const $target = $(event.target);
    if ($target.closest(INPUT_BOX_SELECTOR).length !== 0) {
      this.$component.toggleClass(DROPDOWN_OPEN);
    }
  }

  handleMinusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) return;
    if (counter === 1) $minus.removeClass('dropdown__button-minus_active');

    $counter.html(counter - 1);

    this.updateText();
    if (this.hasControls) {
      this.updateClearButtonVisability();
    }
  }

  handlePlusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) {
      $minus.addClass('dropdown__button-minus_active');
    }

    $counter.html(counter + 1);

    this.updateText();
    if (this.hasControls) {
      this.updateClearButtonVisability();
    }
  }

  handleClearButtonClick() {
    this.rows.forEach((row) => {
      row.$minus.removeClass('dropdown__button-minus_active');
      row.$counter.html('0');
    });

    this.updateText();
    this.updateClearButtonVisability();
  }

  handleAcceptButtonClick() {
    this.$component.removeClass(DROPDOWN_OPEN);
  }

  setText(string) {
    let text = string.substring(0, this.maxLen);
    if (string.length >= this.maxLen) text += '...';
    this.$text.val(text);
  }

  getRows() {
    const rows = Array.from($(ROW_SELECTOR, this.$component));

    return rows.map((row) => {
      const resultObject = {
        $minus: $(row).find(MINUS_SELECTOR),
        $counter: $(row).find(COUNTER_SELECTOR),
        $plus: $(row).find(PLUS_SELECTOR),
      };

      if (this.isSummator) return resultObject;

      const countables = JSON.parse($(row).attr('data-row-countables'));
      return {
        countables,
        ...resultObject,
      };
    });
  }

  sumAllCounts() {
    return this.rows.reduce((sum, row) => sum + Number(row.$counter.html()), 0);
  }

  calcDropdownValue() {
    return this.rows
      .map((row) => {
        const counter = Number(row.$counter.html());

        if (counter === 0) return '';

        return `${counter} ${choiceCountable(counter, row.countables)}`;
      })
      .filter((string) => string !== '')
      .join(', ');
  }

  updateText() {
    const sum = this.sumAllCounts();

    if (sum === 0) {
      this.setText(this.placeholder);
    } else if (this.isSummator) {
      this.setText(`${sum} ${choiceCountable(sum, this.countables)}`);
    } else {
      this.setText(this.calcDropdownValue());
    }

    this.$component.attr('data-value', sum);
    this.triggerValueChanged();
  }

  updateClearButtonVisability() {
    if (this.sumAllCounts() === 0) {
      this.$clear.hide();
    } else {
      this.$clear.show();
    }
  }

  createCalendar(additionalOptions = {}) {
    const options = {
      ...additionalOptions,
      $component: this.$component,
      $content: this.$content,
      texts: this.texts,
      isDatepicker: this.isDatepicker,
      isSplit: this.isSplit,
      triggerValueChanged: () => this.triggerValueChanged(),
      onAcceptButtonClick: () => this.handleAcceptButtonClick(),
      altField: this.texts[0],
    };

    return new MyAirDatepicker(options);
  }

  triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }
}

$(() => {
  $(DROPDOWN_SELECTOR).map((index, node) => new Dropdown($(node)));
});
