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
    const { $inputBox } = this;

    $(document).on('click', this._handleOutOfComponentClick);
    $inputBox.on('click', this._handleInputBoxClick);
  }

  _handleOutOfComponentClick({ target }) {
    const { $component } = this;

    if ($component.has(target).length === 0) {
      $component.removeClass(DROPDOWN_OPEN);
    }
  }

  _handleInputBoxClick() {
    const { $component } = this;

    $component.toggleClass(DROPDOWN_OPEN);
  }

  _triggerValueChanged() {
    const { valueChanged } = this;

    if (valueChanged) {
      $(document).trigger(valueChanged);
    }
  }
}

export default Dropdown;
