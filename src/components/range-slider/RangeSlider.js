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

export default class RangeSlider {
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

    this.setState(this.$range1.attr(VALUE), this.$range2.attr(VALUE));
    this.updateOutput();
  }

  attachEventHandlers() {
    this.$range1.on('input', (event) => this.handleComponentValueChange(event));
    this.$range2.on('input', (event) => this.handleComponentValueChange(event));
  }

  handleComponentValueChange(event) {
    const $range = $(event.target);
    const value = Number(event.target.value);
    let { valueLeft, valueRight } = this.getValues();

    if (this.isLeftValue($range)) {
      valueLeft = value;
    } else {
      valueRight = value;
    }

    this.setState(valueLeft, valueRight);
    this.updateOutput();
  }

  updateOutput() {
    let { valueLeft, valueRight } = this.getValues();
    if (valueLeft > valueRight) [valueLeft, valueRight] = [valueRight, valueLeft];
    const leftRange = Math.round(((this.max - this.min) * valueLeft) / 100 + this.min);
    const rightRange = Math.round(((this.max - this.min) * valueRight) / 100 + this.min);

    this.$output.html(`${makeCurrency(leftRange, this.postfix)} - ${makeCurrency(rightRange, this.postfix)}`);
  }

  isLeftValue($range) {
    return $range[0] === this.$range1[0];
  }

  getValues() {
    return {
      valueLeft: Number(this.$range1.attr(VALUE)),
      valueRight: Number(this.$range2.attr(VALUE)),
    };
  }

  setState(valueLeft, valueRight) {
    RangeSlider.setThumb(valueLeft, this.$range1, this.$thumb1);
    RangeSlider.setThumb(valueRight, this.$range2, this.$thumb2);
    this.setTrack(valueLeft, valueRight);
  }

  static setThumb(value, $range, $thumb) {
    $range.attr(VALUE, value);
    $thumb.css('left', `${value}%`);
    $thumb.css('transform', `translate(-${value}%, -50%)`);
  }

  setTrack(valueLeft, valueRight) {
    if (valueLeft > valueRight) {
      this.$track.css('width', `${valueLeft - valueRight}%`);
      this.$track.css('left', `${valueRight}%`);
    } else {
      this.$track.css('width', `${valueRight - valueLeft}%`);
      this.$track.css('left', `${valueLeft}%`);
    }
  }

  render() {
    this.init();
    this.attachEventHandlers();
  }
}
