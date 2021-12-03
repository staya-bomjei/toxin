import $ from 'jquery';

import '../button/button';
import '../menu/menu';

import './header.scss';

const HEADER_SELECTOR = '.js-header';
const BURGER_BUTTON_SELECTOR = '.js-header__burger';
const INFO_SELECTOR = '.js-header__info';
const BURGER_BUTTON_ACTIVE = 'header__burger_active';

class Header {
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

$(() => {
  $(HEADER_SELECTOR).map((index, node) => new Header($(node)));
});
