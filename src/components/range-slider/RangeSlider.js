import './range-slider.scss';
import $ from 'jquery';

class RangeSlider {
  constructor($component) {
    this.$component = $component;
    this.postfix = $component.attr('data-postfix');
    this.min = Number($component.attr('data-min'));
    this.max = Number($component.attr('data-max'));
    this.$output = $('.js-range-slider__output', $component);
    this.$track = $('.js-range-slider__track-inner', $component);

    const ranges = Array.from($('.js-range-slider__range', $component));
    [this.$range1, this.$range2] = ranges.map((range) => $(range));

    const thumbs = Array.from($('.js-range-slider__thumb', $component));
    [this.$thumb1, this.$thumb2] = thumbs.map((thumb) => $(thumb));

    this.setState(this.$range1.attr('value'), this.$range2.attr('value'));
    this.updateOutput();
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$range1.on('input', (event) => this.onValueChange(event));
    this.$range2.on('input', (event) => this.onValueChange(event));
  }

  onValueChange(event) {
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

    this.$output.html(`${leftRange}${this.postfix} - ${rightRange}${this.postfix}`);
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
  $('.js-range-slider').map((index, node) => new RangeSlider($(node)));
});
