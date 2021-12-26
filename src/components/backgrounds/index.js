import $ from 'jquery';

import Backgrounds from './Backgrounds';
import { BACKGROUNDS_SELECTOR } from './const';

import './backgrounds.scss';

$(() => {
  $(BACKGROUNDS_SELECTOR).each((index, node) => {
    const $node = $(node);
    const checkboxList = new Backgrounds($node);
    checkboxList.render();
  });
});
