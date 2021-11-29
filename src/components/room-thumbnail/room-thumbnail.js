import './room-thumbnail.scss';
import $ from 'jquery';

class RoomThumbnail {
  constructor($component) {
    this.$component = $component;
    this.selected = Number($component.attr('data-selected'));
    this.price = Number($component.attr('data-price'));

    this.images = Array.from($('.js-room-thumbnail__image', $component)).map((item) => $(item));
    this.buttons = Array.from($('.js-room-thumbnail__button', $component)).map((item) => $(item));

    this.$prev = $('.js-room-thumbnail__prev', $component);
    this.$next = $('.js-room-thumbnail__next', $component);
    this.$price = $('.js-room-thumbnail__price', $component);
    this.init();
    this.attachEventHandlers();
  }

  init() {
    this.$price.html(`${this.price.toLocaleString('ru')}₽`);
    this.selectImage(this.selected);
  }

  attachEventHandlers() {
    this.$prev.on('click', () => this.onPrevClick());
    this.$next.on('click', () => this.onNextClick());
    this.buttons.forEach(($button) => {
      $button.on('click', (event) => this.onButtonClick(event));
    });
  }

  onPrevClick() {
    let index = this.selected - 1;
    if (index < 0) index = this.images.length - 1;

    this.selectImage(index);
  }

  onNextClick() {
    let index = this.selected + 1;
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
    this.setSelected(this.images, index, 'room-thumbnail__image_selected');
    this.setSelected(this.buttons, index, 'room-thumbnail__button_selected');
    this.selected = index;
  }

  setSelected(array, index, modifier) {
    if (array.length === 0) return;

    array[this.selected].removeClass(modifier);
    array[index].addClass(modifier);
  }
}

$(() => {
  $('.js-room-thumbnail').map((index, node) => new RoomThumbnail($(node)));
});
