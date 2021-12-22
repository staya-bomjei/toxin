import $ from 'jquery';

import '../checkbox/checkbox';

import './checkbox-list.scss';

const CHECKBOX_LIST_SELECTOR = '.js-checkbox-list';
const BUTTON_SELECTOR = '.js-checkbox-list__button';
const LIST_SELECTOR = '.js-checkbox-list__list';
const CHECKBOX_LIST_OPEN = 'checkbox-list_open';
const CHECKBOX_LIST_EXPANDED = 'checkbox-list_epxanded';

class CheckboxList {
  constructor($component) {
    this.$component = $component;
    this.$button = $(BUTTON_SELECTOR, $component);
    this.$list = $(LIST_SELECTOR, $component);
    this.init();
    this.attachEventHandlers();
  }

  init() {
    if (!this.$component.hasClass(CHECKBOX_LIST_EXPANDED)) {
      this.$list.css('z-index', Number(this.$list.css('z-index')) + 1);
    }
  }

  attachEventHandlers() {
    $(document).on('click', (event) => this.handleOutOfComponentClick(event));
    this.$button.on('click', () => this.handleButtonClick());
  }

  handleButtonClick() {
    this.$component.toggleClass(CHECKBOX_LIST_OPEN);
  }

  handleOutOfComponentClick({ target }) {
    if (this.$component.has(target).length === 0) {
      this.$component.removeClass(CHECKBOX_LIST_OPEN);
    }
  }
}

$(() => {
  $(CHECKBOX_LIST_SELECTOR).map((index, node) => new CheckboxList($(node)));
});
