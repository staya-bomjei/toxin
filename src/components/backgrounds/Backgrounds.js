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

    if ($images.length > 1) {
      this._startAnimationLoop();
    }
  }

  async _startAnimationLoop() {
    const {
      images: {
        length: imagesCounter,
      },
      delayMS,
    } = this;
    this.imageIndex = 0;
    this.nextImageIndex = 1;

    setInterval(async () => {
      const {
        nextImageIndex,
        imageIndex,
      } = this;

      this._setImageZIndex(imageIndex, ABOVE);
      this._setImageZIndex(nextImageIndex, BELOW);
      this._setImageVisibility(nextImageIndex, true);
      this._playImageAnimation(imageIndex);
      await this._stopImageAnimation(imageIndex);

      this.imageIndex = nextImageIndex;
      this.nextImageIndex = (nextImageIndex + 1) % imagesCounter;
    }, delayMS);
  }

  _setImageVisibility(index, visibility) {
    const { images } = this;

    if (visibility) {
      images[index].addClass(IMAGE_VISIBLE);
    } else {
      images[index].removeClass(IMAGE_VISIBLE);
    }
  }

  _setImagesAnimationDuration() {
    const { images, duration } = this;

    images.forEach(($image) => {
      $image.css('animation-duration', `${duration}s`);
    });
  }

  _setImageZIndex(index, zIndex) {
    const { images } = this;

    images[index].css('z-index', zIndex);
  }

  _playImageAnimation(index) {
    const { images } = this;

    images[index].addClass(IMAGE_FADE);
  }

  async _stopImageAnimation(index) {
    const { images, durationMS } = this;

    setTimeout(() => {
      images[index].removeClass(IMAGE_FADE);
      images[index].removeClass(IMAGE_VISIBLE);
    }, durationMS);
  }
}

export default Backgrounds;
