import $ from 'jquery';

import Backgrounds from './Backgrounds';
import { BACKGROUNDS_SELECTOR } from './const';

import './backgrounds.scss';

$(() => {
  $(BACKGROUNDS_SELECTOR).each((_, node) => {
    const $node = $(node);
    const checkboxList = new Backgrounds($node);
    checkboxList.init();
  });
});
