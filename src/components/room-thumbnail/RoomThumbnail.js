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
    this.$prev = $(PREV_SELECTOR, $component);
    this.$next = $(NEXT_SELECTOR, $component);
  }

  init() {
    const { $component, selected } = this;

    this.images = Array.from($(IMAGE_SELECTOR, $component)).map((item) => $(item));
    this.buttons = Array.from($(BUTTON_SELECTOR, $component)).map((item) => $(item));

    this._selectImage(selected);
    this._handlePrevClick = this._handlePrevClick.bind(this);
    this._handleNextClick = this._handleNextClick.bind(this);
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $prev, $next, buttons } = this;

    $prev.on('click', this._handlePrevClick);
    $next.on('click', this._handleNextClick);
    buttons.forEach(($button) => {
      $button.on('click', this._handleButtonClick);
    });
  }

  _handlePrevClick() {
    const { selected, images } = this;
    const index = (selected === 0) ? images.length - 1 : selected - 1;
    this._selectImage(index);
  }

  _handleNextClick() {
    const { selected, images } = this;
    const index = (selected + 1) % images.length;
    this._selectImage(index);
  }

  _handleButtonClick({ target }) {
    const buttonNumber = this._getButtonIndex(target);
    this._selectImage(buttonNumber);
  }

  _getButtonIndex(button) {
    const { buttons } = this;

    return buttons.findIndex(($button) => $button.is(button));
  }

  _selectImage(index) {
    const { images, buttons } = this;

    this._setSelected(images, index, IMAGE_SELECTED);
    this._setSelected(buttons, index, BUTTON_SELECTED);
    this.selected = index;
  }

  _setSelected(array, index, modifier) {
    if (array.length === 0) return;

    const { selected } = this;

    array[selected].removeClass(modifier);
    array[index].addClass(modifier);
  }
}

export default RoomThumbnail;
