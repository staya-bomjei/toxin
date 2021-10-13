import './rate-button.scss';
import $ from 'jquery';

class RateButton {
  constructor($component) {
    this.$component = $component;
    this.stars = Array.from($($component).find('.rate-button__star'));
    this.rate = 0;
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.stars.forEach(($star) => {
      $($star)
        .on('click', (event) => this.onStarClick(event.target))
        .on('mouseover', (event) => this.onStarHover(event.target));
    });
    this.$component.on('mouseout', () => this.setRate(this.rate));
  }

  setRate(rate, isChanging = true) {
    if (isChanging) {
      this.rate = rate;
    }

    this.setStars(rate);
    this.setUnstars(rate);
  }

  onStarClick($star) {
    const rate = this.getStarRate($star);
    this.setRate(rate);
  }

  onStarHover($star) {
    const rate = this.getStarRate($star);
    this.setRate(rate, false);
  }

  setStars(rate) {
    this.stars.slice(0, rate + 1).forEach(($star) => {
      $($star).html('star');
    });
  }

  setUnstars(rate) {
    this.stars.slice(rate + 1).forEach(($star) => {
      $($star).html('star_border');
    });
  }

  getStarRate($star) {
    return this.stars.indexOf($star);
  }
}

$(() => {
  $('.js-rate-button').map((index, node) => new RateButton($(node)));
});