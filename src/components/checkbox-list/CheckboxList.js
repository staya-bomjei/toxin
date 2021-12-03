import $ from 'jquery';

import '../checkbox/Checkbox';

import './checkbox-list.scss';

const CHECKBOX_LIST_SELECTOR = '.js-checkbox-list';
const BUTTON_SELECTOR = '.js-checkbox-list__button';
const CHECKBOX_LIST_OPEN = 'checkbox-list_open';

class CheckboxList {
  constructor($component) {
    this.$component = $component;
    this.$button = $(BUTTON_SELECTOR, $component);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$button.on('click', (event) => this.handleButtonClick(event.target));
  }

  handleButtonClick() {
    this.$component.toggleClass(CHECKBOX_LIST_OPEN);
  }
}

$(() => {
  $(CHECKBOX_LIST_SELECTOR).map((index, node) => new CheckboxList($(node)));
});
