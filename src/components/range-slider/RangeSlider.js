import $ from 'jquery';

import { makeCurrency, calcNearestStepValue } from '../../libs/utils/utils';

import {
  OUTPUT_SELECTOR,
  PROGRESS_SELECTOR,
  TRACK_SELECTOR,
  THUMB_SELECTOR,
  THUMB_ABOVE,
  THUMB_BELOW,
  POSTFIX,
  MIN,
  MAX,
  STEP,
  INIT_FROM,
  INIT_TO,
  MIN_POSITION,
  MAX_POSITION,
} from './const';

class RangeSlider {
  constructor($component) {
    this.$component = $component;
    this.postfix = $component.attr(POSTFIX);
    this.min = Number($component.attr(MIN));
    this.max = Number($component.attr(MAX));
    this.step = Number($component.attr(STEP));
    this.percentStep = (this.step / (this.max - this.min)) * 100;
    this.$output = $(OUTPUT_SELECTOR, $component);
    this.$progress = $(PROGRESS_SELECTOR, $component);
    this.$track = $(TRACK_SELECTOR, $component);
  }

  init() {
    const thumbs = Array.from($(THUMB_SELECTOR, this.$component));
    [this.$leftThumb, this.$rightThumb] = thumbs.map((thumb) => $(thumb));

    const from = Number(this.$component.attr(INIT_FROM));
    const to = Number(this.$component.attr(INIT_TO));
    this._setPosition(this._valueToPosition(from), true);
    this._setPosition(this._valueToPosition(to), false);

    this._update();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$leftThumb.on('pointerdown', (event) => this._handleThumbPointerDown(event));
    this.$rightThumb.on('pointerdown', (event) => this._handleThumbPointerDown(event));

    this.$leftThumb[0].ondragstart = null;
    this.$rightThumb[0].ondragstart = null;
  }

  _handleThumbPointerDown(event) {
    const thumbEl = event.target;
    const isLeftThumb = this._isLeftThumb(thumbEl);

    this._moveThumbTo(isLeftThumb, event);

    const handlePointerMove = (e) => {
      this._moveThumbTo(isLeftThumb, e);
    };

    const handlePointerUp = () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }

  _moveThumbTo(isLeftThumb, event) {
    const leftThumbPosition = this._getPosition(true);
    const rightThumbPosition = this._getPosition(false);
    const oldPosition = (isLeftThumb) ? leftThumbPosition : rightThumbPosition;
    const constraint = (isLeftThumb) ? rightThumbPosition : leftThumbPosition;
    let newPosition = this.calcNearestPosition(event);

    const needToSetConstraint = ((isLeftThumb && newPosition > constraint)
      || (!isLeftThumb && newPosition < constraint))
      && oldPosition !== constraint;
    if (needToSetConstraint) newPosition = constraint;

    const passesConstraint = needToSetConstraint
      || (isLeftThumb) ? newPosition <= constraint : newPosition >= constraint;
    const needToUpdate = passesConstraint && newPosition !== oldPosition;
    if (needToUpdate) {
      this._setPosition(newPosition, isLeftThumb);
      this._update();
    }
  }

  calcNearestPosition(event) {
    const [trackEl] = this.$track;
    const trackRect = trackEl.getBoundingClientRect();
    const pageCoord = event.clientX;
    const trackOffset = trackRect.left;
    const trackLength = trackRect.width;

    let nearestPosition = ((pageCoord - trackOffset) / trackLength) * 100;
    nearestPosition = Math.max(nearestPosition, MIN_POSITION);
    nearestPosition = Math.min(nearestPosition, MAX_POSITION);
    const mayNearest = calcNearestStepValue(nearestPosition, this.percentStep, MIN_POSITION);

    return mayNearest;
  }

  _update() {
    this._updateZIndexes();
    this._updateOutput();
    this._updateProgress();
  }

  _updateZIndexes() {
    if (this.positionRight !== this.positionLeft) return;

    if (this.positionLeft === MAX_POSITION) {
      this.$leftThumb.addClass(THUMB_ABOVE);
      this.$rightThumb.addClass(THUMB_BELOW);
    } else if (this.positionLeft === MIN_POSITION) {
      this.$leftThumb.addClass(THUMB_BELOW);
      this.$rightThumb.addClass(THUMB_ABOVE);
    }
  }

  _updateOutput() {
    const from = this._getValue(true);
    const to = this._getValue(false);
    const currencyFrom = makeCurrency(from, this.postfix);
    const currencyTo = makeCurrency(to, this.postfix);

    this.$output.html(`${currencyFrom} - ${currencyTo}`);
  }

  _updateProgress() {
    const positionLeft = this._getPosition(true);
    const positionRight = this._getPosition(false);
    const width = Math.abs(positionLeft - positionRight);

    this.$progress.css('width', `${width}%`);
    this.$progress.css('left', `${positionLeft}%`);
  }

  _isLeftThumb(thumbEl) {
    return thumbEl === this.$leftThumb[0];
  }

  _getValue(isLeftThumb) {
    return this._positionToValue(this._getPosition(isLeftThumb));
  }

  _getPosition(isLeftThumb) {
    return (isLeftThumb) ? this.positionLeft : this.positionRight;
  }

  _setPosition(position, isLeftThumb) {
    if (isLeftThumb) {
      this.positionLeft = position;
      this.$leftThumb.css('left', `${position}%`);
    } else {
      this.positionRight = position;
      this.$rightThumb.css('left', `${position}%`);
    }
  }

  _positionToValue(position) {
    return Math.round(((this.max - this.min) * position) / 100 + this.min);
  }

  _valueToPosition(value) {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  _setZIndexes(valueLeft, valueRight) {
    if (valueLeft !== valueRight) return;

    if (valueLeft === MIN_POSITION) {
      this.$leftThumb.addClass(THUMB_BELOW);
      this.$rightThumb.addClass(THUMB_ABOVE);
    } else if (valueLeft === MAX_POSITION) {
      this.$leftThumb.addClass(THUMB_ABOVE);
      this.$rightThumb.addClass(THUMB_BELOW);
    }
  }
}

export default RangeSlider;
