import $ from 'jquery';

import {
  ICON_SELECTOR,
  COUNTER_SELECTOR,
  ICON_UNLIKED,
  ICON_LIKED,
  BUTTON_LIKED,
} from './const';

class LikeButton {
  constructor($component) {
    this.$component = $component;
    this.$icon = $(ICON_SELECTOR, $component);
    this.$counter = $(COUNTER_SELECTOR, $component);
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$component.on('click', () => this._handleComponentClick());
  }

  _handleComponentClick() {
    if (this._isLiked()) {
      this._setCounter(this._getCounter() - 1);
      this.$icon.html(ICON_UNLIKED);
    } else {
      this._setCounter(this._getCounter() + 1);
      this.$icon.html(ICON_LIKED);
    }
    this.$component.toggleClass(BUTTON_LIKED);
  }

  _isLiked() {
    return this.$component.hasClass(BUTTON_LIKED);
  }

  _getCounter() {
    return Number(this.$counter.html());
  }

  _setCounter(counter) {
    this.$counter.html(counter);
  }
}

export default LikeButton;
