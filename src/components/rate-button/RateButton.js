import './rate-button.scss';
import $ from 'jquery';

class RateButton {
  constructor($component) {
    this.$component = $component;
    this.rate = Number($component.attr('data-rate'));
    this.stars = Array.from($('.js-rate-button__star', $component)).map((item) => $(item));
    this.setState(this.rate);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.stars.forEach(($star) => {
      $star
        .on('click', (event) => this.onStarClick(event))
        .on('mouseover', (event) => this.onStarHover(event));
    });
    this.$component.on('mouseout', () => this.setState(this.rate));
  }

  onStarClick(event) {
    const star = event.target;
    const rate = this.getStarRate(star);

    if (this.rate === rate) {
      this.setState(0);
    } else {
      this.setState(rate);
    }
  }

  onStarHover(event) {
    const star = event.target;
    const rate = this.getStarRate(star);
    this.setState(rate, false);
  }

  setState(rate, isChanging = true) {
    if (isChanging) {
      this.rate = rate;
      this.$component.attr('data-rate', rate);
    }

    this.stars.forEach(($star, index) => {
      $star.html((index < rate) ? 'star' : 'star_border');
    });
  }

  getStarRate(star) {
    return this.stars.findIndex(($star) => $star.is(star)) + 1;
  }
}

$(() => {
  $('.js-rate-button').map((index, node) => new RateButton($(node)));
});
