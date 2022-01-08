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
  VALUE,
} from './const';

class Counter extends Dropdown {
  constructor($component) {
    super($component);
    this.maxLen = Number($component.attr(MAX_LEN));
    this.hasControls = $component.has(HAS_CONTROLS) !== undefined;
    this.$text = $(TEXT_SELECTOR, this.$component);
    this.rows = this._getRows();
  }

  init() {
    if (this.hasControls) {
      this._initControls();
    }

    super.init();
    this._update();
  }

  _initControls() {
    this.$clear = this.$component.find(CLEAR_BUTTON_SELECTOR);
    this.$accept = this.$component.find(ACCEPT_BUTTON_SELECTOR);
  }

  _attachEventHandlers() {
    super._attachEventHandlers();

    if (this.hasControls) {
      this.$clear.on('click', () => this._handleClearButtonClick());
      this.$accept.on('click', (event) => this._handleAcceptButtonClick(event));
    }

    this.rows.forEach((row) => {
      row.$minus.on('click', () => this._handleMinusClick(row.$minus, row.$counter));
      row.$plus.on('click', () => this._handlePlusClick(row.$minus, row.$counter));
    });
  }

  _handleClearButtonClick() {
    this.rows.forEach((row) => {
      row.$minus.removeClass(MINUS_ACTIVE);
      row.$counter.html(0);
    });

    this._update();
  }

  _handleAcceptButtonClick() {
    this.$component.removeClass(DROPDOWN_OPEN);
  }

  _handleMinusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) return;
    if (counter === 1) $minus.removeClass(MINUS_ACTIVE);

    $counter.html(counter - 1);

    this._update();
  }

  _handlePlusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) {
      $minus.addClass(MINUS_ACTIVE);
    }

    $counter.html(counter + 1);

    this._update();
  }

  _setText(string) {
    let text = string.substring(0, this.maxLen);
    if (string.length >= this.maxLen) text += '...';
    this.$text.val(text);
  }

  _getRows() {
    const rows = Array.from($(ROW_SELECTOR, this.$component));

    return rows.map((row) => {
      const $row = $(row);
      const resultObj = {
        $minus: $row.find(MINUS_SELECTOR),
        $counter: $row.find(COUNTER_SELECTOR),
        $plus: $row.find(PLUS_SELECTOR),
        countables: null,
      };

      if ($row.attr(ROW_COUNTABLES) !== undefined) {
        resultObj.countables = JSON.parse($row.attr(ROW_COUNTABLES));
      }

      return resultObj;
    });
  }

  _areAllCountersZero() {
    return this.rows.every((row) => Number(row.$counter.html()) === 0);
  }

  _update() {
    this._updateText();
    this._updateValue();
    this._updateClearButtonVisibility();
    this._triggerValueChanged();
  }

  _updateText() {
    if (this._areAllCountersZero()) {
      this._setText('');
    } else {
      this._setText(this._calcDropdownText());
    }
  }

  _updateValue() {
    this.$component.attr(VALUE, this._calcDropdownValue());
  }

  _updateClearButtonVisibility() {
    if (this._areAllCountersZero()) {
      this.$clear.hide();
    } else {
      this.$clear.show();
    }
  }

  _calcDropdownValue() {
    return this.rows.map((row) => Number(row.$counter.html()));
  }

  _calcDropdownText() {
    return this.rows
      .map((row) => {
        const counter = Number(row.$counter.html());
        if (counter === 0) return '';
        return `${counter} ${choiceCountable(counter, row.countables)}`;
      })
      .filter((string) => string !== '')
      .join(', ');
  }
}

export default Counter;
