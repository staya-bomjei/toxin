import './like-button.scss';
import $ from 'jquery';

class LikeButton {
  constructor($component) {
    this.$component = $component;
    this.$icon = $($component).find('.like-button__icon');
    this.$counter = $($component).find('.like-button__counter');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(this.$component).on('click', () => this.onClick());
  }

  onClick() {
    if (this.isLiked()) {
      this.setCount(this.getCount() - 1);
      this.setIcon(false);
    } else {
      this.setCount(this.getCount() + 1);
      this.setIcon(true);
    }
    $(this.$component).toggleClass('like-button_liked');
  }

  setIcon(isLiked) {
    if (isLiked) {
      this.$icon.html('favorite');
    } else {
      this.$icon.html('favorite_border');
    }
  }

  isLiked() {
    return this.$component.hasClass('like-button_liked');
  }

  getCount() {
    return Number(this.$counter.html());
  }

  setCount(count) {
    this.$counter.html(count);
  }
}

$(() => {
  $('.js-like-button').map((index, node) => new LikeButton($(node)));
});
