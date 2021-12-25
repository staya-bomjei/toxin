import $ from 'jquery';

import {
  DROPDOWNS_SELECTOR,
  INPUT_BOX_SELECTOR,
  CONTENT_SELECTOR,
  DROPDOWN_OPEN,
  DROPDOWN_EXPANDED,
  VALUE_CHANGED,
} from './const';

export default class Dropdown {
  constructor($component) {
    this.$component = $component;
    this.valueChanged = $component.attr(VALUE_CHANGED);
    this.$dropdowns = $(DROPDOWNS_SELECTOR, $component);
    this.$content = $(CONTENT_SELECTOR, $component);
  }

  init() {
    if (!this.$component.hasClass(DROPDOWN_EXPANDED)) {
      this.$content.css('z-index', Number(this.$content.css('z-index')) + 1);
    }
  }

  attachEventHandlers() {
    $(document).on('click', (event) => this.handleOutOfComponentClick(event));
    this.$dropdowns.on('click', (event) => this.handleDropdownsClick(event));
  }

  handleOutOfComponentClick({ target }) {
    if (this.$component.has(target).length === 0) {
      this.$component.removeClass(DROPDOWN_OPEN);
    }
  }

  handleDropdownsClick({ target }) {
    const $target = $(target);
    if ($target.closest(INPUT_BOX_SELECTOR).length !== 0) {
      this.$component.toggleClass(DROPDOWN_OPEN);
    }
  }

  triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }

  render() {
    this.init();
    this.attachEventHandlers();
  }
}
