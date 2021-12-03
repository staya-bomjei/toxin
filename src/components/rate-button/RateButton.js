import './rate-button.scss';
import $ from 'jquery';

const RATE_BUTTON_SELECTOR = '.js-rate-button';
const STAR_SELECTOR = '.js-rate-button__star';
const STAR_ICON = 'star';
const UNSTAR_ICON = 'star_border';
const RATE_ATTR = 'data-rate';

class RateButton {
  constructor($component) {
    this.$component = $component;
    this.rate = Number($component.attr(RATE_ATTR));
    this.stars = Array.from($(STAR_SELECTOR, $component)).map((item) => $(item));
    this.setState(this.rate);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.stars.forEach(($star) => {
      $star
        .on('click', (event) => this.handleStarClick(event))
        .on('mouseover', (event) => this.handleStarHover(event));
    });
    this.$component.on('mouseout', () => this.setState(this.rate));
  }

  handleStarClick(event) {
    const star = event.target;
    const rate = this.getStarRate(star);

    if (this.rate === rate) {
      this.setState(0);
    } else {
      this.setState(rate);
    }
  }

  handleStarHover(event) {
    const star = event.target;
    const rate = this.getStarRate(star);
    this.setState(rate, false);
  }

  setState(rate, isChanging = true) {
    if (isChanging) {
      this.rate = rate;
      this.$component.attr(RATE_ATTR, rate);
    }

    this.stars.forEach(($star, index) => {
      $star.html((index < rate) ? STAR_ICON : UNSTAR_ICON);
    });
  }

  getStarRate(star) {
    return this.stars.findIndex(($star) => $star.is(star)) + 1;
  }
}

$(() => {
  $(RATE_BUTTON_SELECTOR).map((index, node) => new RateButton($(node)));
});
