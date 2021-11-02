import './hotel-number.scss';
import $ from 'jquery';

class HotelNumber {
  constructor($component) {
    this.$component = $component;
    this.selected = Number($component.attr('data-selected'));
    this.price = Number($component.attr('data-price'));
    this.postfix = $component.attr('data-postfix');

    this.images = Array.from($('.js-hotel-number__image', $component));
    this.buttons = Array.from($('.js-hotel-number__button', $component));

    this.$toLeft = $('.js-hotel-number__to-left', $component);
    this.$toRight = $('.js-hotel-number__to-right', $component);
    this.$price = $('.js-hotel-number__price', $component);
    this.init();
    this.attachEventHandlers();
  }

  init() {
    this.$price.html(this.price.toLocaleString('ru') + this.postfix);
    this.setSelected(this.selected);
  }

  attachEventHandlers() {
    this.$toLeft.on('click', () => this.onToLeftClick());
    this.$toRight.on('click', () => this.onToRightClick());
    this.buttons.forEach((button) => {
      $(button).on('click', (event) => this.onButtonClick(event));
    });
  }

  onToLeftClick() {
    let imageNumber = this.selected - 1;
    if (imageNumber < 0) imageNumber = this.images.length - 1;

    this.setSelected(imageNumber);
  }

  onToRightClick() {
    let imageNumber = this.selected + 1;
    if (imageNumber > this.images.length - 1) imageNumber = 0;

    this.setSelected(imageNumber);
  }

  onButtonClick(event) {
    const buttonNumber = this.buttons.indexOf(event.target);
    this.setSelected(buttonNumber);
  }

  getButtonIndex(button) {
    return this.buttons.indexOf(button);
  }

  setSelected(selected) {
    this.setImageSelected(selected);
    this.setButtonSelected(selected);
    this.selected = selected;
  }

  setImageSelected(imageNumber) {
    if (this.images.length === 0) return;

    $(this.images[this.selected]).removeClass('hotel-number__image_selected');
    $(this.images[imageNumber]).addClass('hotel-number__image_selected');
  }

  setButtonSelected(buttonNumber) {
    if (this.buttons.length === 0) return;

    $(this.buttons[this.selected]).removeClass('hotel-number__button_selected');
    $(this.buttons[buttonNumber]).addClass('hotel-number__button_selected');
  }
}

$(() => {
  $('.js-hotel-number').map((index, node) => new HotelNumber($(node)));
});
