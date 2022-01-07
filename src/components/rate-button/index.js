import $ from 'jquery';

import RateButton from './RateButton';
import { RATE_BUTTON_SELECTOR } from './const';

import './rate-button.scss';

$(() => {
  $(RATE_BUTTON_SELECTOR).each((index, node) => {
    const $node = $(node);
    const rateButton = new RateButton($node);
    rateButton.init();
  });
});
