import './like-button.scss';
import $ from 'jquery';

class LikeButton {
  constructor($component) {
    this.$component = $component;
    this.$icon = $('.js-like-button__icon', $component);
    this.$counter = $('.js-like-button__counter', $component);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$component.on('click', () => this.onClick());
  }

  onClick() {
    if (this.isLiked()) {
      this.setCounter(this.getCounter() - 1);
      this.$icon.html('favorite_border');
    } else {
      this.setCounter(this.getCounter() + 1);
      this.$icon.html('favorite');
    }
    this.$component.toggleClass('like-button_liked');
  }

  isLiked() {
    return this.$component.hasClass('like-button_liked');
  }

  getCounter() {
    return Number(this.$counter.html());
  }

  setCounter(counter) {
    this.$counter.html(counter);
  }
}

$(() => {
  $('.js-like-button').map((index, node) => new LikeButton($(node)));
});
