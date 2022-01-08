import $ from 'jquery';

import RangeSlider from './RangeSlider';
import { RANGES_SLIDER_SELECTOR } from './const';

import './range-slider.scss';

$(() => {
  $(RANGES_SLIDER_SELECTOR).each((_, node) => {
    const $node = $(node);
    const rangeSlider = new RangeSlider($node);
    rangeSlider.init();
  });
});
