import $ from 'jquery';

import LikeButton from './LikeButton';
import { LIKE_BUTTON_SELECTOR } from './const';

import './like-button.scss';

$(() => {
  $(LIKE_BUTTON_SELECTOR).map((index, node) => new LikeButton($(node)));
});
