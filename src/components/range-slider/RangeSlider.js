import $ from 'jquery';

import { makeCurrency } from '../../libs/utils/utils';

import {
  OUTPUT_SELECTOR,
  TRACK_SELECTOR,
  RANGE_SELECTOR,
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
    this.$track = $(TRACK_SELECTOR, $component);
  }

  init() {
    const ranges = Array.from($(RANGE_SELECTOR, this.$component));
    [this.$range1, this.$range2] = ranges.map((range) => $(range));
    const thumbs = Array.from($(THUMB_SELECTOR, this.$component));
    [this.$thumb1, this.$thumb2] = thumbs.map((thumb) => $(thumb));

    this._setState(this.$range1.attr(VALUE), this.$range2.attr(VALUE));
    this._updateOutput();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$range1.on('input', (event) => this._handleComponentValueChange(event));
    this.$range2.on('input', (event) => this._handleComponentValueChange(event));
  }

  _handleComponentValueChange({ target }) {
    const $range = $(target);
    const value = Number(target.value);
    let { valueLeft, valueRight } = this._getValues();

    if (this._isLeftValue($range)) {
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
    const leftRange = Math.round(((this.max - this.min) * valueLeft) / 100 + this.min);
    const rightRange = Math.round(((this.max - this.min) * valueRight) / 100 + this.min);

    this.$output.html(`${makeCurrency(leftRange, this.postfix)} - ${makeCurrency(rightRange, this.postfix)}`);
  }

  _isLeftValue($range) {
    return $range[0] === this.$range1[0];
  }

  _getValues() {
    return {
      valueLeft: Number(this.$range1.attr(VALUE)),
      valueRight: Number(this.$range2.attr(VALUE)),
    };
  }

  _setState(valueLeft, valueRight) {
    RangeSlider.setThumb(valueLeft, this.$range1, this.$thumb1);
    RangeSlider.setThumb(valueRight, this.$range2, this.$thumb2);
    this._setTrack(valueLeft, valueRight);
  }

  static setThumb(value, $range, $thumb) {
    $range.attr(VALUE, value);
    $thumb.css('left', `${value}%`);
    $thumb.css('transform', `translate(-${value}%, -50%)`);
  }

  _setTrack(valueLeft, valueRight) {
    if (valueLeft > valueRight) {
      this.$track.css('width', `${valueLeft - valueRight}%`);
      this.$track.css('left', `${valueRight}%`);
    } else {
      this.$track.css('width', `${valueRight - valueLeft}%`);
      this.$track.css('left', `${valueLeft}%`);
    }
  }
}

export default RangeSlider;
