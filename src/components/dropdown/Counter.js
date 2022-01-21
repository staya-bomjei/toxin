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
    this.$text = $(TEXT_SELECTOR, $component);
    this.rows = this._getRows();
  }

  init() {
    const { hasControls } = this;

    if (hasControls) {
      this._initControls();
    }

    this._handleClearButtonClick = this._handleClearButtonClick.bind(this);
    this._handleAcceptButtonClick = this._handleAcceptButtonClick.bind(this);
    this._handleMinusClick = this._handleMinusClick.bind(this);
    this._handlePlusClick = this._handlePlusClick.bind(this);
    super.init();
    this._update();
  }

  _initControls() {
    const { $component } = this;

    this.$clear = $component.find(CLEAR_BUTTON_SELECTOR);
    this.$accept = $component.find(ACCEPT_BUTTON_SELECTOR);
  }

  _attachEventHandlers() {
    super._attachEventHandlers();

    const {
      hasControls,
      rows,
      $clear,
      $accept,
    } = this;

    if (hasControls) {
      $clear.on('click', this._handleClearButtonClick);
      $accept.on('click', this._handleAcceptButtonClick);
    }

    rows.forEach((row) => {
      row.$minus.on('click', this._handleMinusClick);
      row.$plus.on('click', this._handlePlusClick);
    });
  }

  _handleClearButtonClick() {
    const { rows } = this;

    rows.forEach((row) => {
      row.$minus.removeClass(MINUS_ACTIVE);
      row.$counter.html(0);
    });

    this._update();
  }

  _handleAcceptButtonClick() {
    const { $component } = this;

    $component.removeClass(DROPDOWN_OPEN);
  }

  _handleMinusClick({ target }) {
    const $minus = $(target);
    const $counter = $minus.siblings(COUNTER_SELECTOR);
    const counter = Number($counter.html());

    if (counter === 0) return;
    if (counter === 1) $minus.removeClass(MINUS_ACTIVE);

    $counter.html(counter - 1);

    this._update();
  }

  _handlePlusClick({ target }) {
    const $plus = $(target);
    const $minus = $plus.siblings(MINUS_SELECTOR);
    const $counter = $plus.siblings(COUNTER_SELECTOR);
    const counter = Number($counter.html());

    if (counter === 0) {
      $minus.addClass(MINUS_ACTIVE);
    }

    $counter.html(counter + 1);

    this._update();
  }

  _setText(string) {
    const { maxLen, $text } = this;

    let text = string.substring(0, maxLen);
    if (string.length >= maxLen) text += '...';
    $text.val(text);
  }

  _getRows() {
    const { $component } = this;
    const rows = Array.from($(ROW_SELECTOR, $component));

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
    const { rows } = this;

    return rows.every((row) => Number(row.$counter.html()) === 0);
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
    const { $component } = this;

    $component.attr(VALUE, this._calcDropdownValue());
  }

  _updateClearButtonVisibility() {
    const { $clear } = this;

    if (this._areAllCountersZero()) {
      $clear.hide();
    } else {
      $clear.show();
    }
  }

  _calcDropdownValue() {
    const { rows } = this;

    return rows.map((row) => Number(row.$counter.html()));
  }

  _calcDropdownText() {
    const { rows } = this;

    return rows
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
