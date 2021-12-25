import $ from 'jquery';

import RateButton from './RateButton';
import { RATE_BUTTON_SELECTOR } from './const';

import './rate-button.scss';

$(() => {
  $(RATE_BUTTON_SELECTOR).map((index, node) => new RateButton($(node)));
});
