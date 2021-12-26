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

export default class Backgrounds {
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

    this.setImageVisibility(0, true);
    this.setImagesAnimationDuration();
  }

  async startAnimationLoop() {
    const imagesCounter = this.images.length;
    this.imageIndex = 0;
    this.nextImageIndex = (this.imageIndex + 1) % imagesCounter;

    setInterval(async () => {
      this.setImageZIndex(this.imageIndex, ABOVE);
      this.setImageZIndex(this.nextImageIndex, BELOW);
      this.setImageVisibility(this.nextImageIndex, true);
      this.playImageAnimation(this.imageIndex);
      await this.stopImageAnimation(this.imageIndex);

      this.imageIndex = this.nextImageIndex;
      this.nextImageIndex = (this.imageIndex + 1) % imagesCounter;
    }, this.delayMS);
  }

  setImageVisibility(index, visibility) {
    if (visibility) {
      this.images[index].addClass(IMAGE_VISIBLE);
    } else {
      this.images[index].removeClass(IMAGE_VISIBLE);
    }
  }

  setImagesAnimationDuration() {
    this.images.forEach(($image) => {
      $image.css('animation-duration', `${this.duration}s`);
    });
  }

  setImageZIndex(index, zIndex) {
    this.images[index].css('z-index', zIndex);
  }

  playImageAnimation(index) {
    this.images[index].addClass(IMAGE_FADE);
  }

  async stopImageAnimation(index) {
    setTimeout(() => {
      this.images[index].removeClass(IMAGE_FADE);
      this.images[index].removeClass(IMAGE_VISIBLE);
    }, this.durationMS);
  }

  render() {
    this.init();
    if (this.images.length > 1) {
      this.startAnimationLoop();
    }
  }
}
