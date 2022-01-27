import $ from 'jquery';

import Menu from './Menu';
import { MENU_SELECTOR } from './const';

import './menu.scss';

$(() => {
  $(MENU_SELECTOR).each((_, node) => {
    const $node = $(node);
    const header = new Menu($node);
    header.init();
  });
});
