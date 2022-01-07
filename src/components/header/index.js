import $ from 'jquery';

import '../button';
import '../menu';

import Header from './Header';
import { HEADER_SELECTOR } from './const';

import './header.scss';

$(() => {
  $(HEADER_SELECTOR).each((index, node) => {
    const $node = $(node);
    const header = new Header($node);
    header.init();
  });
});
