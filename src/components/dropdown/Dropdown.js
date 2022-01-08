import $ from 'jquery';

import {
  INPUTS_SELECTOR,
  INPUT_BOX_SELECTOR,
  CONTENT_SELECTOR,
  DROPDOWN_OPEN,
  DROPDOWN_EXPANDED,
  VALUE_CHANGED,
} from './const';

class Dropdown {
  constructor($component) {
    this.$component = $component;
    this.valueChanged = $component.attr(VALUE_CHANGED);
    this.$inputs = $(INPUTS_SELECTOR, $component);
    this.$content = $(CONTENT_SELECTOR, $component);
  }

  init() {
    if (!this.$component.hasClass(DROPDOWN_EXPANDED)) {
      this.$content.css('z-index', Number(this.$content.css('z-index')) + 1);
    }

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    $(document).on('click', (event) => this._handleOutOfComponentClick(event));
    this.$inputs.on('click', (event) => this._handleInputsClick(event));
  }

  _handleOutOfComponentClick({ target }) {
    if (this.$component.has(target).length === 0) {
      this.$component.removeClass(DROPDOWN_OPEN);
    }
  }

  _handleInputsClick({ target }) {
    const $target = $(target);
    if ($target.closest(INPUT_BOX_SELECTOR).length !== 0) {
      this.$component.toggleClass(DROPDOWN_OPEN);
    }
  }

  _triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }
}

export default Dropdown;
