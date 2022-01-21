import $ from 'jquery';

import { makeCurrency, calcNearestStepValue } from '../../libs/utils/utils';

import {
  OUTPUT_SELECTOR,
  PROGRESS_SELECTOR,
  TRACK_SELECTOR,
  THUMB_SELECTOR,
  THUMB_ABOVE,
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
    const { $component } = this;
    const thumbs = Array.from($(THUMB_SELECTOR, $component));
    [this.$leftThumb, this.$rightThumb] = thumbs.map((thumb) => $(thumb));

    const from = Number($component.attr(INIT_FROM));
    const to = Number($component.attr(INIT_TO));
    this._setPosition(this._valueToPosition(from), true);
    this._setPosition(this._valueToPosition(to), false);

    this._update();
    this._handleThumbPointerDown = this._handleThumbPointerDown.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$leftThumb.on('pointerdown', this._handleThumbPointerDown);
    this.$rightThumb.on('pointerdown', this._handleThumbPointerDown);

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
    let newPosition = this._calcNearestPosition(event);

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

  _calcNearestPosition(event) {
    const [trackEl] = this.$track;
    const trackRect = trackEl.getBoundingClientRect();
    const { clientX: pageCoord } = event;
    const {
      left: trackOffset,
      width: trackLength,
    } = trackRect;

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
      this.$rightThumb.removeClass(THUMB_ABOVE);
    } else if (this.positionLeft === MIN_POSITION) {
      this.$leftThumb.removeClass(THUMB_ABOVE);
      this.$rightThumb.addClass(THUMB_ABOVE);
    }
  }

  _updateOutput() {
    const { postfix } = this;
    const from = this._getValue(true);
    const to = this._getValue(false);
    const currencyFrom = makeCurrency(from, postfix);
    const currencyTo = makeCurrency(to, postfix);

    this.$output.html(`${currencyFrom} - ${currencyTo}`);
  }

  _updateProgress() {
    const positionLeft = this._getPosition(true);
    const positionRight = this._getPosition(false);
    const width = Math.abs(positionLeft - positionRight);

    const { $progress } = this;
    $progress.css('width', `${width}%`);
    $progress.css('left', `${positionLeft}%`);
  }

  _isLeftThumb(thumbEl) {
    const { $leftThumb } = this;

    return thumbEl === $leftThumb[0];
  }

  _getValue(isLeftThumb) {
    return this._positionToValue(this._getPosition(isLeftThumb));
  }

  _getPosition(isLeftThumb) {
    const { positionLeft, positionRight } = this;

    return (isLeftThumb) ? positionLeft : positionRight;
  }

  _setPosition(position, isLeftThumb) {
    const { $leftThumb, $rightThumb } = this;

    if (isLeftThumb) {
      this.positionLeft = position;
      $leftThumb.css('left', `${position}%`);
    } else {
      this.positionRight = position;
      $rightThumb.css('left', `${position}%`);
    }
  }

  _positionToValue(position) {
    const { max, min } = this;

    return Math.round(((max - min) * position) / 100 + min);
  }

  _valueToPosition(value) {
    const { max, min } = this;

    return ((value - min) / (max - min)) * 100;
  }
}

export default RangeSlider;
