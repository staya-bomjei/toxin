import './dropdown.scss';
import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import $ from 'jquery';
import { ruLocale } from './ru';

class Dropdown {
  constructor($component) {
    this.placeholder = $component.attr('data-placeholder');
    this.valueChanged = $component.attr('data-value-changed');
    this.maxLen = Number($component.attr('data-max-len'));
    const type = $component.attr('data-type');
    this.isDatepicker = type === 'datepicker';
    this.isSummator = type === 'summator';
    this.hasControls = $component.attr('data-has-controls') !== undefined;
    this.$component = $component;
    this.$dropdowns = $('.js-dropdown__dropdowns', $component);
    this.$content = $('.js-dropdown__content', $component);

    if (this.isDatepicker) {
      this.texts = $('.js-dropdown__text', $component);
      this.isSplit = $component.attr('data-is-split') !== undefined;
      const range = $component.attr('data-is-range') !== undefined;
      this.datepicker = this.createCalendar({ range });
      const selected = JSON.parse($component.attr('data-selected'));
      this.datepicker.selectDate(selected);
      $('button', this.datepicker.$buttons).attr('type', 'button');
    } else {
      this.$text = $('.js-dropdown__text', $component);

      if (this.isSummator) {
        this.countables = JSON.parse($component.attr('data-countables'));
        this.rows = this.getRows();
      } else {
        this.rows = this.getRows();
      }

      this.updateText();

      if (this.hasControls) {
        this.$clear = $component.find('.js-dropdown__clear-button');
        this.$accept = $component.find('.js-dropdown__accept-button');
        this.updateClearButtonVisability();
      }
    }
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(document).on('click', (event) => this.onOutOfComponentClick(event));
    this.$dropdowns.on('click', (event) => this.onDropdownsClick(event));

    if (!this.isDatepicker) {
      if (this.hasControls) {
        this.$clear.on('click', () => this.onClearButtonClick());
        this.$accept.on('click', (event) => this.onAcceptButtonClick(event));
      }

      this.rows.forEach((row) => {
        row.$minus.on('click', () => this.onMinusClick(row.$minus, row.$counter));
        row.$plus.on('click', () => this.onPlusClick(row.$minus, row.$counter));
      });
    }
  }

  setText(string) {
    let text = string.substring(0, this.maxLen);
    if (string.length >= this.maxLen) text += '...';
    this.$text.val(text);
  }

  getRows() {
    const rows = Array.from($('.js-dropdown__row', this.$component));

    return rows.map((row) => {
      const resultObject = {
        $minus: $(row).find('.js-dropdown__button-minus'),
        $counter: $(row).find('.js-dropdown__counter'),
        $plus: $(row).find('.js-dropdown__button-plus'),
      };

      if (this.isSummator) return resultObject;

      const countables = JSON.parse($(row).attr('data-row-countables'));
      return {
        countables,
        ...resultObject,
      };
    });
  }

  onOutOfComponentClick(event) {
    const { target } = event;
    if (!this.$component.is(target) && this.$component.has(target).length === 0) {
      this.$component.removeClass('dropdown_open');
    }
  }

  onDropdownsClick(event) {
    const $target = $(event.target);
    if ($target.closest('.js-dropdown__input-box').length !== 0) {
      this.$component.toggleClass('dropdown_open');
    }
  }

  onMinusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) return;
    if (counter === 1) $minus.removeClass('dropdown__button-minus_active');

    $counter.html(counter - 1);

    this.updateText();
    if (this.hasControls) {
      this.updateClearButtonVisability();
    }
  }

  onPlusClick($minus, $counter) {
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

  onClearButtonClick() {
    this.rows.forEach((row) => {
      row.$minus.removeClass('dropdown__button-minus_active');
      row.$counter.html('0');
    });

    this.updateText();
    this.updateClearButtonVisability();
  }

  onClearCalendarClick(dp) {
    dp.clear();
    if (this.isSplit) {
      $(this.texts[1]).val('');
    }
  }

  onAcceptButtonClick() {
    this.$component.removeClass('dropdown_open');
  }

  onCellSelect({ date, datepicker }) {
    if (this.isDatepicker) {
      const [first, second] = datepicker.selectedDates;

      if (datepicker.selectedDates.length === 1) {
        if (this.isSplit) {
          $(this.texts[0]).val(first.toLocaleDateString('ru'));
          $(this.texts[1]).val('');
        }

        this.$component.attr('data-from', first.toLocaleDateString('en'));
        this.$component.attr('data-to', '');
      } else if (datepicker.selectedDates.length === 2) {
        if (this.isSplit) {
          $(this.texts[0]).val(first.toLocaleDateString('ru'));
          $(this.texts[1]).val(second.toLocaleDateString('ru'));
        }

        this.$component.attr('data-from', first.toLocaleDateString('en'));
        this.$component.attr('data-to', second.toLocaleDateString('en'));
      }
    }

    if (datepicker.selectedDates.length === 1) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const selector = `.air-datepicker-cell[data-year=${year}][data-month=${month}][data-date=${day}]`;
      const $selectedCell = $(selector, datepicker.$datepicker);

      if ($selectedCell.hasClass('-focus-')) {
        $selectedCell.addClass('-range-from-');
        $selectedCell.addClass('-range-to-');
      }
    }

    $(document).trigger(this.valueChanged);
  }

  sumAllCounts() {
    return this.rows.reduce((sum, row) => sum + Number(row.$counter.html()), 0);
  }

  static choiceCountable(counter, countables) {
    if (counter === 1) {
      return countables[0];
    }

    if (counter > 10 && counter < 20) {
      return countables[2];
    }

    switch (counter % 10) {
      case 1:
        return countables[0];
      case 2:
      case 3:
      case 4:
        return countables[1];
      default:
        return countables[2];
    }
  }

  getSentence() {
    return this.rows
      .map((row) => {
        const counter = Number(row.$counter.html());

        if (counter === 0) return '';

        return `${counter} ${Dropdown.choiceCountable(counter, row.countables)}`;
      })
      .filter((string) => string !== '')
      .join(', ');
  }

  updateText() {
    const sum = this.sumAllCounts();

    if (sum === 0) {
      this.setText(this.placeholder);
    } else if (this.isSummator) {
      this.setText(`${sum} ${Dropdown.choiceCountable(sum, this.countables)}`);
    } else {
      this.setText(this.getSentence());
    }

    this.$component.attr('data-value', sum);
    $(document).trigger(this.valueChanged);
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
      inline: true,
      locale: ruLocale,
      altField: this.texts[0],
      altFieldDateFormat: 'd MMM',
      prevHtml: '',
      nextHtml: '',
      multipleDatesSeparator: ' - ',
      dateFormat: 'd MMM',
      moveToOtherMonthsOnSelect: false,
      navTitles: {
        days: 'MMMM yyyy',
      },
      onSelect: (dp) => this.onCellSelect(dp),
      buttons: [
        {
          content: 'очистить',
          onClick: (dp) => this.onClearCalendarClick(dp),
        },
        {
          content: 'принять',
          onClick: () => this.onAcceptButtonClick(),
        },
      ],
    };

    return new AirDatepicker(this.$content[0], options);
  }
}

$(() => {
  $('.js-dropdown').map((index, node) => new Dropdown($(node)));
});
