import $ from 'jquery';

import { makeCurrency } from '../../libs/utils/utils';

import './range-slider.scss';

const RANGES_SLIDER_SELECTOR = '.js-range-slider';
const OUTPUT_SELECTOR = '.js-range-slider__output';
const TRACK_SELECTOR = '.js-range-slider__track-inner';
const RANGE_SELECTOR = '.js-range-slider__range';
const THUMB_SELECTOR = '.js-range-slider__thumb';
const POSTFIX_ATTR = 'data-postfix';
const MIN_ATTR = 'data-min';
const MAX_ATTR = 'data-max';

class RangeSlider {
  constructor($component) {
    this.$component = $component;
    this.postfix = $component.attr(POSTFIX_ATTR);
    this.min = Number($component.attr(MIN_ATTR));
    this.max = Number($component.attr(MAX_ATTR));
    this.$output = $(OUTPUT_SELECTOR, $component);
    this.$track = $(TRACK_SELECTOR, $component);

    const ranges = Array.from($(RANGE_SELECTOR, $component));
    [this.$range1, this.$range2] = ranges.map((range) => $(range));

    const thumbs = Array.from($(THUMB_SELECTOR, $component));
    [this.$thumb1, this.$thumb2] = thumbs.map((thumb) => $(thumb));

    this.setState(this.$range1.attr('value'), this.$range2.attr('value'));
    this.updateOutput();
    this.attachEventHandlers();
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
      valueLeft: Number(this.$range1.attr('value')),
      valueRight: Number(this.$range2.attr('value')),
    };
  }

  setState(valueLeft, valueRight) {
    RangeSlider.setThumb(valueLeft, this.$range1, this.$thumb1);
    RangeSlider.setThumb(valueRight, this.$range2, this.$thumb2);
    this.setTrack(valueLeft, valueRight);
  }

  static setThumb(value, $range, $thumb) {
    $range.attr('value', value);
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
}

$(() => {
  $(RANGES_SLIDER_SELECTOR).map((index, node) => new RangeSlider($(node)));
});
