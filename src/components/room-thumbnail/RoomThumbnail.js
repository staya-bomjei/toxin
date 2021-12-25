import $ from 'jquery';

import {
  IMAGE_SELECTOR,
  BUTTON_SELECTOR,
  PREV_SELECTOR,
  NEXT_SELECTOR,
  PRICE_SELECTOR,
  IMAGE_SELECTED,
  BUTTON_SELECTED,
} from './const';

export default class RoomThumbnail {
  constructor($component) {
    this.$component = $component;
    this.selected = Number($component.attr('data-selected'));
    this.price = Number($component.attr('data-price'));

    this.images = Array.from($(IMAGE_SELECTOR, $component)).map((item) => $(item));
    this.buttons = Array.from($(BUTTON_SELECTOR, $component)).map((item) => $(item));

    this.$prev = $(PREV_SELECTOR, $component);
    this.$next = $(NEXT_SELECTOR, $component);
    this.$price = $(PRICE_SELECTOR, $component);
    this.init();
    this.attachEventHandlers();
  }

  init() {
    this.$price.html(`${this.price.toLocaleString('ru')}₽`);
    this.selectImage(this.selected);
  }

  attachEventHandlers() {
    this.$prev.on('click', () => this.handlePrevClick());
    this.$next.on('click', () => this.handleNextClick());
    this.buttons.forEach(($button) => {
      $button.on('click', (event) => this.handleButtonClick(event));
    });
  }

  handlePrevClick() {
    let index = this.selected - 1;
    if (index < 0) index = this.images.length - 1;

    this.selectImage(index);
  }

  handleNextClick() {
    let index = this.selected + 1;
    if (index > this.images.length - 1) index = 0;

    this.selectImage(index);
  }

  handleButtonClick(event) {
    const buttonNumber = this.getButtonIndex(event.target);
    this.selectImage(buttonNumber);
  }

  getButtonIndex(button) {
    return this.buttons.findIndex(($button) => $button.is(button));
  }

  selectImage(index) {
    this.setSelected(this.images, index, IMAGE_SELECTED);
    this.setSelected(this.buttons, index, BUTTON_SELECTED);
    this.selected = index;
  }

  setSelected(array, index, modifier) {
    if (array.length === 0) return;

    array[this.selected].removeClass(modifier);
    array[index].addClass(modifier);
  }
}
