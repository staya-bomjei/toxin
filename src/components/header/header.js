import './header.scss';
import $ from 'jquery';

class Header {
  constructor($component) {
    this.$component = $component;
    this.$burgerButton = $('.js-header__burger', $component);
    this.$info = $('.js-header__info', $component);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(document).on('resize', () => this.onResizeDocument());
    this.$burgerButton.on('click', () => this.onBurgerButtonClick());
  }

  onResizeDocument() {
    if (this.$burgerButton.is(':hidden')) {
      this.$info.show();
    }
  }

  onBurgerButtonClick() {
    this.$burgerButton.toggleClass('header__burger_active');
    this.$info.toggle();
  }
}

$(() => {
  $('.js-header').map((index, node) => new Header($(node)));
});
