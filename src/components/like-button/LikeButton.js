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
    this._handleComponentClick = this._handleComponentClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $component } = this;

    $component.on('click', this._handleComponentClick);
  }

  _handleComponentClick() {
    const { $component, $icon } = this;

    if (this._isLiked()) {
      this._setCounter(this._getCounter() - 1);
      $icon.html(ICON_UNLIKED);
    } else {
      this._setCounter(this._getCounter() + 1);
      $icon.html(ICON_LIKED);
    }
    $component.toggleClass(BUTTON_LIKED);
  }

  _isLiked() {
    const { $component } = this;

    return $component.hasClass(BUTTON_LIKED);
  }

  _getCounter() {
    const { $counter } = this;

    return Number($counter.html());
  }

  _setCounter(counter) {
    const { $counter } = this;

    $counter.html(counter);
  }
}

export default LikeButton;
