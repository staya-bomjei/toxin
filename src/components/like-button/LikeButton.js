import $ from 'jquery';

import {
  ICON_SELECTOR,
  COUNTER_SELECTOR,
  ICON_UNLIKED,
  ICON_LIKED,
  BUTTON_LIKED,
} from './const';

export default class LikeButton {
  constructor($component) {
    this.$component = $component;
    this.$icon = $(ICON_SELECTOR, $component);
    this.$counter = $(COUNTER_SELECTOR, $component);
  }

  attachEventHandlers() {
    this.$component.on('click', () => this.handleComponentClick());
  }

  handleComponentClick() {
    if (this.isLiked()) {
      this.setCounter(this.getCounter() - 1);
      this.$icon.html(ICON_UNLIKED);
    } else {
      this.setCounter(this.getCounter() + 1);
      this.$icon.html(ICON_LIKED);
    }
    this.$component.toggleClass(BUTTON_LIKED);
  }

  isLiked() {
    return this.$component.hasClass(BUTTON_LIKED);
  }

  getCounter() {
    return Number(this.$counter.html());
  }

  setCounter(counter) {
    this.$counter.html(counter);
  }

  render() {
    this.attachEventHandlers();
  }
}
