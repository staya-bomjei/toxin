import $ from 'jquery';

import RangeSlider from './RangeSlider';
import { RANGES_SLIDER_SELECTOR } from './const';

import './range-slider.scss';

$(() => {
  $(RANGES_SLIDER_SELECTOR).each((index, node) => {
    const $node = $(node);
    const rangeSlider = new RangeSlider($node);
    rangeSlider.init();
  });
});
