import $ from 'jquery';

import '../button';
import '../menu';

import Header from './Header';
import { HEADER_SELECTOR } from './const';

import './header.scss';

$(() => {
  $(HEADER_SELECTOR).map((index, node) => new Header($(node)));
});
