import $ from 'jquery';

import { makeCurrency } from '../../libs/utils/utils';

import {
  OUTPUT_SELECTOR,
  PROGRESS_SELECTOR,
  INPUT_SELECTOR,
  THUMB_SELECTOR,
  VALUE,
  POSTFIX,
  MIN,
  MAX,
} from './const';

class RangeSlider {
  constructor($component) {
    this.$component = $component;
    this.postfix = $component.attr(POSTFIX);
    this.min = Number($component.attr(MIN));
    this.max = Number($component.attr(MAX));
    this.$output = $(OUTPUT_SELECTOR, $component);
    this.$progress = $(PROGRESS_SELECTOR, $component);
  }

  init() {
    const inputs = Array.from($(INPUT_SELECTOR, this.$component));
    [this.$leftInput, this.$rightInput] = inputs.map((input) => $(input));
    const thumbs = Array.from($(THUMB_SELECTOR, this.$component));
    [this.$leftThumb, this.$rightThumb] = thumbs.map((thumb) => $(thumb));

    this._setState(this.$leftInput.attr(VALUE), this.$rightInput.attr(VALUE));
    this._updateOutput();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$leftInput.on('input', (event) => this._handleComponentValueChange(event));
    this.$rightInput.on('input', (event) => this._handleComponentValueChange(event));
  }

  _handleComponentValueChange({ target }) {
    const $input = $(target);
    const value = Number(target.value);
    let { valueLeft, valueRight } = this._getValues();

    if (this._isLeftValue($input)) {
      valueLeft = value;
    } else {
      valueRight = value;
    }

    this._setState(valueLeft, valueRight);
    this._updateOutput();
  }

  _updateOutput() {
    let { valueLeft, valueRight } = this._getValues();
    if (valueLeft > valueRight) [valueLeft, valueRight] = [valueRight, valueLeft];

    const from = Math.round(((this.max - this.min) * valueLeft) / 100 + this.min);
    const to = Math.round(((this.max - this.min) * valueRight) / 100 + this.min);
    const currencyFrom = makeCurrency(from, this.postfix);
    const currencyTo = makeCurrency(to, this.postfix);

    this.$output.html(`${currencyFrom} - ${currencyTo}`);
  }

  _isLeftValue($input) {
    return $input[0] === this.$leftInput[0];
  }

  _getValues() {
    return {
      valueLeft: Number(this.$leftInput.attr(VALUE)),
      valueRight: Number(this.$rightInput.attr(VALUE)),
    };
  }

  _setState(valueLeft, valueRight) {
    this._setThumb(valueLeft, true);
    this._setThumb(valueRight, false);
    this._setProgress(valueLeft, valueRight);
  }

  _setThumb(value, isLeftThumb) {
    const $range = (isLeftThumb) ? this.$leftInput : this.$rightInput;
    const $thumb = (isLeftThumb) ? this.$leftThumb : this.$rightThumb;

    $range.attr(VALUE, value);
    $thumb.css('left', `${value}%`);
    $thumb.css('transform', `translate(-${value}%, -50%)`);
  }

  _setProgress(valueLeft, valueRight) {
    const width = Math.abs(valueLeft - valueRight);
    const offset = (valueLeft > valueRight) ? valueRight : valueLeft;

    this.$progress.css('width', `${width}%`);
    this.$progress.css('left', `${offset}%`);
  }
}

export default RangeSlider;
