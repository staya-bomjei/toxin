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
    this._selectImage(this.selected);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$prev.on('click', () => this._handlePrevClick());
    this.$next.on('click', () => this._handleNextClick());
    this.buttons.forEach(($button) => {
      $button.on('click', (event) => this._handleButtonClick(event));
    });
  }

  _handlePrevClick() {
    const index = (this.selected === 0) ? this.images.length - 1 : this.selected - 1;
    this._selectImage(index);
  }

  _handleNextClick() {
    const index = (this.selected + 1) % this.images.length;
    this._selectImage(index);
  }

  _handleButtonClick({ target }) {
    const buttonNumber = this._getButtonIndex(target);
    this._selectImage(buttonNumber);
  }

  _getButtonIndex(button) {
    return this.buttons.findIndex(($button) => $button.is(button));
  }

  _selectImage(index) {
    this._setSelected(this.images, index, IMAGE_SELECTED);
    this._setSelected(this.buttons, index, BUTTON_SELECTED);
    this.selected = index;
  }

  _setSelected(array, index, modifier) {
    if (array.length === 0) return;

    array[this.selected].removeClass(modifier);
    array[index].addClass(modifier);
  }
}

export default RoomThumbnail;
