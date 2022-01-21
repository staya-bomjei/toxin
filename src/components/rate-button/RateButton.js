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
    this._setState(this.rate);
    this._handleStarClick = this._handleStarClick.bind(this);
    this._handleStarHover = this._handleStarHover.bind(this);
    this._handleComponentMouseOut = this._handleComponentMouseOut.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.stars.forEach(($star) => {
      $star
        .on('click', this._handleStarClick)
        .on('mouseover', this._handleStarHover);
    });
    this.$component.on('mouseout', this._handleComponentMouseOut);
  }

  _handleStarClick(event) {
    const star = event.target;
    const rate = this._getStarRate(star);

    if (this.rate === rate) {
      this.rate = 0;
    } else {
      this._setState(rate);
    }
  }

  _handleStarHover(event) {
    const star = event.target;
    const rate = this._getStarRate(star);
    this._setState(rate, false);
  }

  _handleComponentMouseOut() {
    this._setState(this.rate);
  }

  _setState(rate, isChanging = true) {
    if (isChanging) {
      this.rate = rate;
      this.$component.attr(RATE, rate);
    }

    this.stars.forEach(($star, index) => {
      $star.html((index < rate) ? STAR_ICON : UNSTAR_ICON);
    });
  }

  _getStarRate(star) {
    return this.stars.findIndex(($star) => $star.is(star)) + 1;
  }
}

export default RateButton;
