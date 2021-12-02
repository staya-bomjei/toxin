import './like-button.scss';
import $ from 'jquery';

const LIKE_BUTTON_SELECTOR = '.js-like-button';
const ICON_SELECTOR = '.js-like-button__icon';
const COUNTER_SELECTOR = '.js-like-button__counter';
const ICON_LIKED = 'favorite';
const ICON_UNLIKED = 'favorite_border';
const BUTTON_LIKED_CLASS = 'like-button_liked';

class LikeButton {
  constructor($component) {
    this.$component = $component;
    this.$icon = $(ICON_SELECTOR, $component);
    this.$counter = $(COUNTER_SELECTOR, $component);
    this.attachEventHandlers();
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
    this.$component.toggleClass(BUTTON_LIKED_CLASS);
  }

  isLiked() {
    return this.$component.hasClass(BUTTON_LIKED_CLASS);
  }

  getCounter() {
    return Number(this.$counter.html());
  }

  setCounter(counter) {
    this.$counter.html(counter);
  }
}

$(() => {
  $(LIKE_BUTTON_SELECTOR).map((index, node) => new LikeButton($(node)));
});
