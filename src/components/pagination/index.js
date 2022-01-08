import $ from 'jquery';

import Pagination from './Pagination';
import { PAGINATION_SELECTOR } from './const';

import './pagination.scss';

$(() => {
  $(PAGINATION_SELECTOR).each((_, node) => {
    const $node = $(node);
    const pagination = new Pagination($node);
    pagination.init();
  });
});
