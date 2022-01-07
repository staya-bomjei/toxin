import $ from 'jquery';

import {
  STAR_SELECTOR,
  STAR_ICON,
  UNSTAR_ICON,
  RATE,
} from './const';

class RateButton {
  constructor($component) {
    this.$component = $component;
    this.rate = Number($component.attr(RATE));
    this.stars = Array.from($(STAR_SELECTOR, $component)).map((item) => $(item));
  }

  init() {
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
      this.$component.attr(RATE, rate);
    }

    this.stars.forEach(($star, index) => {
      $star.html((index < rate) ? STAR_ICON : UNSTAR_ICON);
    });
  }

  getStarRate(star) {
    return this.stars.findIndex(($star) => $star.is(star)) + 1;
  }
}

export default RateButton;
