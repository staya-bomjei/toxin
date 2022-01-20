import $ from 'jquery';

import {
  BUTTON_SELECTOR,
  CHECKBOX_LIST_OPEN,
} from './const';

class CheckboxList {
  constructor($component) {
    this.$component = $component;
    this.$button = $(BUTTON_SELECTOR, $component);
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$button.on('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    this.$component.toggleClass(CHECKBOX_LIST_OPEN);
  }
}

export default CheckboxList;
