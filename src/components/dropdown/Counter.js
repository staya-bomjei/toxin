import $ from 'jquery';

import { choiceCountable } from '../../libs/utils/utils';

import Dropdown from './Dropdown';
import {
  ROW_SELECTOR,
  MINUS_SELECTOR,
  PLUS_SELECTOR,
  COUNTER_SELECTOR,
  DROPDOWN_OPEN,
  TEXT_SELECTOR,
  CLEAR_BUTTON_SELECTOR,
  ACCEPT_BUTTON_SELECTOR,
  MINUS_ACTIVE,
  MAX_LEN,
  HAS_CONTROLS,
  ROW_COUNTABLES,
} from './const';

export default class Counter extends Dropdown {
  constructor($component) {
    super($component);
    this.maxLen = Number($component.attr(MAX_LEN));
    this.hasControls = $component.has(HAS_CONTROLS) !== undefined;
    this.$text = $(TEXT_SELECTOR, this.$component);
  }

  init() {
    super.init();

    this.rows = this.getRows();
    this.updateText();

    if (this.hasControls) {
      this.$clear = this.$component.find(CLEAR_BUTTON_SELECTOR);
      this.$accept = this.$component.find(ACCEPT_BUTTON_SELECTOR);
      this.updateClearButtonVisability();
    }
  }

  attachEventHandlers() {
    super.attachEventHandlers();

    if (this.hasControls) {
      this.$clear.on('click', () => this.handleClearButtonClick());
      this.$accept.on('click', (event) => this.handleAcceptButtonClick(event));
    }

    this.rows.forEach((row) => {
      row.$minus.on('click', () => this.handleMinusClick(row.$minus, row.$counter));
      row.$plus.on('click', () => this.handlePlusClick(row.$minus, row.$counter));
    });
  }

  handleClearButtonClick() {
    this.rows.forEach((row) => {
      row.$minus.removeClass(MINUS_ACTIVE);
      row.$counter.html(0);
    });

    this.updateText();
    this.updateClearButtonVisability();
  }

  handleAcceptButtonClick() {
    this.$component.removeClass(DROPDOWN_OPEN);
  }

  handleMinusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) return;
    if (counter === 1) $minus.removeClass(MINUS_ACTIVE);

    $counter.html(counter - 1);

    this.updateText();
    this.updateClearButtonVisability();
  }

  handlePlusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) {
      $minus.addClass(MINUS_ACTIVE);
    }

    $counter.html(counter + 1);

    this.updateText();
    this.updateClearButtonVisability();
  }

  setText(string) {
    let text = string.substring(0, this.maxLen);
    if (string.length >= this.maxLen) text += '...';
    this.$text.val(text);
  }

  getRows() {
    const rows = Array.from($(ROW_SELECTOR, this.$component));

    return rows.map((row) => {
      const $row = $(row);
      const resultObj = {
        $minus: $(row).find(MINUS_SELECTOR),
        $counter: $(row).find(COUNTER_SELECTOR),
        $plus: $(row).find(PLUS_SELECTOR),
        countables: null,
      };

      if ($row.attr(ROW_COUNTABLES) !== undefined) {
        resultObj.countables = JSON.parse($(row).attr(ROW_COUNTABLES));
      }

      return resultObj;
    });
  }

  areAllCountersZero() {
    return this.rows.every((row) => Number(row.$counter.html()) === 0);
  }

  updateText() {
    if (this.areAllCountersZero()) {
      this.setText('');
    } else {
      this.setText(this.calcDropdownValue());
    }

    this.triggerValueChanged();
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

  updateClearButtonVisability() {
    if (this.areAllCountersZero()) {
      this.$clear.hide();
    } else {
      this.$clear.show();
    }
  }

  render() {
    this.init();
    this.attachEventHandlers();
  }
}