import './hotel-number.scss';
import $ from 'jquery';

class HotelNumber {
  constructor($component) {
    this.$component = $component;
    this.index = Number($component.attr('data-selected'));
    this.price = Number($component.attr('data-price'));
    this.postfix = $component.attr('data-postfix');

    this.images = Array.from($('.js-hotel-number__image', $component)).map((item) => $(item));
    this.buttons = Array.from($('.js-hotel-number__button', $component)).map((item) => $(item));

    this.$toLeft = $('.js-hotel-number__to-left', $component);
    this.$toRight = $('.js-hotel-number__to-right', $component);
    this.$price = $('.js-hotel-number__price', $component);
    this.init();
    this.attachEventHandlers();
  }

  init() {
    this.$price.html(this.price.toLocaleString('ru') + this.postfix);
    this.selectImage(this.index);
  }

  attachEventHandlers() {
    this.$toLeft.on('click', () => this.onToLeftClick());
    this.$toRight.on('click', () => this.onToRightClick());
    this.buttons.forEach(($button) => {
      $button.on('click', (event) => this.onButtonClick(event));
    });
  }

  onToLeftClick() {
    let index = this.index - 1;
    if (index < 0) index = this.images.length - 1;

    this.selectImage(index);
  }

  onToRightClick() {
    let index = this.index + 1;
    if (index > this.images.length - 1) index = 0;

    this.selectImage(index);
  }

  onButtonClick(event) {
    const buttonNumber = this.getButtonIndex(event.target);
    this.selectImage(buttonNumber);
  }

  getButtonIndex(button) {
    return this.buttons.findIndex(($button) => $button.is(button));
  }

  selectImage(index) {
    this.setSelected(this.images, index, 'hotel-number__image_selected');
    this.setSelected(this.buttons, index, 'hotel-number__button_selected');
    this.index = index;
  }

  setSelected(array, index, modifier) {
    if (array.length === 0) return;

    array[this.index].removeClass(modifier);
    array[index].addClass(modifier);
  }
}

$(() => {
  $('.js-hotel-number').map((index, node) => new HotelNumber($(node)));
});
