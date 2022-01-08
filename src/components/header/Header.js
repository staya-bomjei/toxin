import $ from 'jquery';

import {
  BURGER_BUTTON_SELECTOR,
  INFO_SELECTOR,
  BURGER_BUTTON_ACTIVE,
  INFO_MOBILE_EXPANDED,
} from './const';

class Header {
  constructor($component) {
    this.$component = $component;
    this.$burgerButton = $(BURGER_BUTTON_SELECTOR, $component);
    this.$info = $(INFO_SELECTOR, $component);
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$burgerButton.on('click', () => this._handleBurgerButtonClick());
  }

  _handleBurgerButtonClick() {
    this.$burgerButton.toggleClass(BURGER_BUTTON_ACTIVE);
    this.$info.toggleClass(INFO_MOBILE_EXPANDED);
  }
}

export default Header;
