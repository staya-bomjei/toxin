import $ from 'jquery';

import LikeButton from './LikeButton';
import { LIKE_BUTTON_SELECTOR } from './const';

import './like-button.scss';

$(() => {
  $(LIKE_BUTTON_SELECTOR).each((_, node) => {
    const $node = $(node);
    const likeButton = new LikeButton($node);
    likeButton.init();
  });
});
