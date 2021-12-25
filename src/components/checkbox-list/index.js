import $ from 'jquery';

import '../checkbox';

import CheckboxList from './CheckboxList';
import { CHECKBOX_LIST_SELECTOR } from './const';

import './checkbox-list.scss';

$(() => {
  $(CHECKBOX_LIST_SELECTOR).each((index, node) => {
    const $node = $(node);
    const checkboxList = new CheckboxList($node);
    checkboxList.render();
  });
});
