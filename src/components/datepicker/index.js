import $ from 'jquery';

import Datepicker from './Datepicker';
import { DATEPICKER_SELECTOR } from './const';

import './datepicker.scss';

$(() => {
  $(DATEPICKER_SELECTOR).each((_, node) => {
    const $node = $(node);
    const datepicker = new Datepicker($node);
    datepicker.init();
  });
});
