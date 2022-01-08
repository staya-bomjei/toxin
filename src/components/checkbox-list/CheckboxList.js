import $ from 'jquery';

import {
  BUTTON_SELECTOR,
  LIST_SELECTOR,
  CHECKBOX_LIST_EXPANDED,
  CHECKBOX_LIST_OPEN,
} from './const';

class CheckboxList {
  constructor($component) {
    this.$component = $component;
    this.$button = $(BUTTON_SELECTOR, $component);
    this.$list = $(LIST_SELECTOR, $component);
  }

  init() {
    if (!this.$component.hasClass(CHECKBOX_LIST_EXPANDED)) {
      this.$list.css('z-index', Number(this.$list.css('z-index')) + 1);
    }
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    $(document).on('click', (event) => this._handleOutOfComponentClick(event));
    this.$button.on('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    this.$component.toggleClass(CHECKBOX_LIST_OPEN);
  }

  _handleOutOfComponentClick({ target }) {
    if (this.$component.has(target).length === 0) {
      this.$component.removeClass(CHECKBOX_LIST_OPEN);
    }
  }
}

export default CheckboxList;
