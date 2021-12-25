import $ from 'jquery';

import {
  BURGER_BUTTON_SELECTOR,
  INFO_SELECTOR,
  BURGER_BUTTON_ACTIVE,
} from './const';

export default class Header {
  constructor($component) {
    this.$component = $component;
    this.$burgerButton = $(BURGER_BUTTON_SELECTOR, $component);
    this.$info = $(INFO_SELECTOR, $component);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(document).on('resize', () => this.handleDocumentResize());
    this.$burgerButton.on('click', () => this.handleBurgerButtonClick());
  }

  handleDocumentResize() {
    if (this.$burgerButton.is(':hidden')) {
      this.$info.show();
    }
  }

  handleBurgerButtonClick() {
    this.$burgerButton.toggleClass(BURGER_BUTTON_ACTIVE);
    this.$info.toggle();
  }
}
