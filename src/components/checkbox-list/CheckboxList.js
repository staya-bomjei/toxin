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
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $button } = this;

    $button.on('click', this._handleButtonClick);
  }

  _handleButtonClick() {
    const { $component } = this;

    $component.toggleClass(CHECKBOX_LIST_OPEN);
  }
}

export default CheckboxList;
