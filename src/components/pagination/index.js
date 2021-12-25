import $ from 'jquery';

import Pagination from './Pagination';
import { PAGINATION_SELECTOR } from './const';

import './pagination.scss';

$(() => {
  $(PAGINATION_SELECTOR).map((index, node) => new Pagination($(node)));
});
