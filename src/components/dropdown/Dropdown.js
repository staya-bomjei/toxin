import $ from 'jquery';

import {
  INPUT_BOX_SELECTOR,
  CONTENT_SELECTOR,
  DROPDOWN_OPEN,
  VALUE_CHANGED,
} from './const';

class Dropdown {
  constructor($component) {
    this.$component = $component;
    this.valueChanged = $component.attr(VALUE_CHANGED);
    this.$inputBox = $(INPUT_BOX_SELECTOR, $component);
    this.$content = $(CONTENT_SELECTOR, $component);
  }

  init() {
    this._handleOutOfComponentClick = this._handleOutOfComponentClick.bind(this);
    this._handleInputBoxClick = this._handleInputBoxClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    $(document).on('click', this._handleOutOfComponentClick);
    this.$inputBox.on('click', this._handleInputBoxClick);
  }

  _handleOutOfComponentClick({ target }) {
    if (this.$component.has(target).length === 0) {
      this.$component.removeClass(DROPDOWN_OPEN);
    }
  }

  _handleInputBoxClick() {
    this.$component.toggleClass(DROPDOWN_OPEN);
  }

  _triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }
}

export default Dropdown;
