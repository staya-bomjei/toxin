import $ from 'jquery';

import {
  IMAGE_SELECTOR,
  BUTTON_SELECTOR,
  PREV_SELECTOR,
  NEXT_SELECTOR,
  IMAGE_SELECTED,
  BUTTON_SELECTED,
  SELECTED,
} from './const';

class RoomThumbnail {
  constructor($component) {
    this.$component = $component;
    this.selected = Number($component.attr(SELECTED));
    this.images = Array.from($(IMAGE_SELECTOR, $component)).map((item) => $(item));
    this.buttons = Array.from($(BUTTON_SELECTOR, $component)).map((item) => $(item));
    this.$prev = $(PREV_SELECTOR, $component);
    this.$next = $(NEXT_SELECTOR, $component);
  }

  init() {
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
    const index = (this.selected === 0) ? this.images.length - 1 : this.selected - 1;
    this.selectImage(index);
  }

  handleNextClick() {
    const index = (this.selected + 1) % this.images.length;
    this.selectImage(index);
  }

  handleButtonClick({ target }) {
    const buttonNumber = this.getButtonIndex(target);
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

  render() {
    this.init();
    this.attachEventHandlers();
  }
}

export default RoomThumbnail;
