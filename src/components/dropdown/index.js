import $ from 'jquery';

import '../button';

import Dropdown from './Dropdown';
import Datepicker from './Datepicker';
import Counter from './Counter';
import Summator from './Summator';
import { DROPDOWN_SELECTOR, TYPE } from './const';

import './dropdown.scss';

function dropdownFactory(type, $node) {
  switch (type) {
    case 'datepicker':
      return new Datepicker($node);
    case 'counter':
      return new Counter($node);
    case 'summator':
      return new Summator($node);
    default:
      return new Dropdown($node);
  }
}

$(() => {
  $(DROPDOWN_SELECTOR).each((index, node) => {
    const $node = $(node);
    const type = $node.attr(TYPE);
    const dropdown = dropdownFactory(type, $node);
    dropdown.render();
  });
});
