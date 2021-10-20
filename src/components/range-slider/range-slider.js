import './range-slider.scss';
import $ from 'jquery';

class RangeSlider {
  constructor($component) {
    this.$component = $component;
    this.$output = $component.find('.range-slider__output');
    [this.$range1, this.$range2] = $component.find('.range-slider__range');
    this.$track = $component.find('.range-slider__track-inner');
    [this.$thumb1, this.$thumb2] = $component.find('.range-slider__thumb');
    this.postfix = $component.attr('data-postfix');
    this.min = Number($component.attr('data-min'));
    this.max = Number($component.attr('data-max'));
    this.setUpSliders($(this.$range1).attr('value'), $(this.$range2).attr('value'));
    this.updateOutput();
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(this.$range1).on('input', (event) => this.updateSlider(event));
    $(this.$range2).on('input', (event) => this.updateSlider(event));
  }

  updateSlider(event) {
    const $range = event.target;
    const value = Number(event.target.value);
    let { valueLeft, valueRight } = this.getValues();

    if (this.isLeftValue($range)) {
      valueLeft = value;
    } else {
      valueRight = value;
    }

    this.setUpSliders(valueLeft, valueRight);
    this.updateOutput();
  }

  updateOutput() {
    let { valueLeft, valueRight } = this.getValues();
    if (valueLeft > valueRight) [valueLeft, valueRight] = [valueRight, valueLeft];
    const leftRange = Math.round(((this.max - this.min) * valueLeft) / 100 + this.min);
    const rightRange = Math.round(((this.max - this.min) * valueRight) / 100 + this.min);

    $(this.$output).html(`${leftRange}${this.postfix} - ${rightRange}${this.postfix}`);
  }

  isLeftValue($range) {
    return $range === this.$range1;
  }

  getValues() {
    return {
      valueLeft: Number($(this.$range1).attr('value')),
      valueRight: Number($(this.$range2).attr('value')),
    };
  }

  setUpSliders(valueLeft, valueRight) {
    RangeSlider.setUpThumb(valueLeft, this.$range1, this.$thumb1);
    RangeSlider.setUpThumb(valueRight, this.$range2, this.$thumb2);
    this.setUpTrack(valueLeft, valueRight);
  }

  static setUpThumb(value, $range, $thumb) {
    $($range).attr('value', value);
    $($thumb).css('left', `${value}%`);
    $($thumb).css('transform', `translate(-${value}%, -50%)`);
  }

  setUpTrack(valueLeft, valueRight) {
    if (valueLeft > valueRight) {
      $(this.$track).css('width', `${valueLeft - valueRight}%`);
      $(this.$track).css('left', `${valueRight}%`);
    } else {
      $(this.$track).css('width', `${valueRight - valueLeft}%`);
      $(this.$track).css('left', `${valueLeft}%`);
    }
  }
}

$(() => {
  $('.js-range-slider').map((index, node) => new RangeSlider($(node)));
});
