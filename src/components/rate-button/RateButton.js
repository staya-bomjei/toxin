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
    const { rate } = this;

    this._setState(rate);
    this._handleStarClick = this._handleStarClick.bind(this);
    this._handleStarHover = this._handleStarHover.bind(this);
    this._handleComponentMouseOut = this._handleComponentMouseOut.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $component, stars } = this;

    stars.forEach(($star) => {
      $star
        .on('click', this._handleStarClick)
        .on('mouseover', this._handleStarHover);
    });
    $component.on('mouseout', this._handleComponentMouseOut);
  }

  _handleStarClick(event) {
    const { rate: originalRate } = this;
    const star = event.target;
    const rate = this._getStarRate(star);

    if (originalRate === rate) {
      this.rate = 0;
    } else {
      this._setState(rate);
    }
  }

  _handleStarHover({ target }) {
    const rate = this._getStarRate(target);
    this._setState(rate, false);
  }

  _handleComponentMouseOut() {
    const { rate } = this;

    this._setState(rate);
  }

  _setState(rate, isChanging = true) {
    const { $component, stars } = this;

    if (isChanging) {
      this.rate = rate;
      $component.attr(RATE, rate);
    }

    stars.forEach(($star, index) => {
      $star.html((index < rate) ? STAR_ICON : UNSTAR_ICON);
    });
  }

  _getStarRate(star) {
    const { stars } = this;

    return stars.findIndex(($star) => $star.is(star)) + 1;
  }
}

export default RateButton;
