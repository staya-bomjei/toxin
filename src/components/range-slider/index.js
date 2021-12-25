import $ from 'jquery';

import RangeSlider from './RangeSlider';
import { RANGES_SLIDER_SELECTOR } from './const';

import './range-slider.scss';

$(() => {
  $(RANGES_SLIDER_SELECTOR).map((index, node) => new RangeSlider($(node)));
});
