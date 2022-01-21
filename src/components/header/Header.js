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
    this._handleBurgerButtonClick = this._handleBurgerButtonClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $burgerButton } = this;

    $burgerButton.on('click', this._handleBurgerButtonClick);
  }

  _handleBurgerButtonClick() {
    const { $burgerButton, $info } = this;

    $burgerButton.toggleClass(BURGER_BUTTON_ACTIVE);
    $info.toggleClass(INFO_MOBILE_EXPANDED);
  }
}

export default Header;
