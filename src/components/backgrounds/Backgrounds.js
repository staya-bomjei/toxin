import $ from 'jquery';

import {
  IMAGE_SELECTOR,
  IMAGE_VISIBLE,
  IMAGE_FADE,
  DELAY,
  DURATION,
  ABOVE,
  BELOW,
  MS_PER_SECOND,
} from './const';

class Backgrounds {
  constructor($component) {
    this.$component = $component;
    this.delay = Number($component.attr(DELAY));
    this.delayMS = this.delay * MS_PER_SECOND;
    this.duration = Number($component.attr(DURATION));
    this.durationMS = this.duration * MS_PER_SECOND;
  }

  init() {
    const $images = $(IMAGE_SELECTOR, this.$component);
    this.images = Array.from($images).map((image) => $(image));

    this._setImageVisibility(0, true);
    this._setImagesAnimationDuration();

    if (this.images.length > 1) {
      this._startAnimationLoop();
    }
  }

  async _startAnimationLoop() {
    const imagesCounter = this.images.length;
    this.imageIndex = 0;
    this.nextImageIndex = (this.imageIndex + 1) % imagesCounter;

    setInterval(async () => {
      this._setImageZIndex(this.imageIndex, ABOVE);
      this._setImageZIndex(this.nextImageIndex, BELOW);
      this._setImageVisibility(this.nextImageIndex, true);
      this._playImageAnimation(this.imageIndex);
      await this._stopImageAnimation(this.imageIndex);

      this.imageIndex = this.nextImageIndex;
      this.nextImageIndex = (this.imageIndex + 1) % imagesCounter;
    }, this.delayMS);
  }

  _setImageVisibility(index, visibility) {
    if (visibility) {
      this.images[index].addClass(IMAGE_VISIBLE);
    } else {
      this.images[index].removeClass(IMAGE_VISIBLE);
    }
  }

  _setImagesAnimationDuration() {
    this.images.forEach(($image) => {
      $image.css('animation-duration', `${this.duration}s`);
    });
  }

  _setImageZIndex(index, zIndex) {
    this.images[index].css('z-index', zIndex);
  }

  _playImageAnimation(index) {
    this.images[index].addClass(IMAGE_FADE);
  }

  async _stopImageAnimation(index) {
    setTimeout(() => {
      this.images[index].removeClass(IMAGE_FADE);
      this.images[index].removeClass(IMAGE_VISIBLE);
    }, this.durationMS);
  }
}

export default Backgrounds;
