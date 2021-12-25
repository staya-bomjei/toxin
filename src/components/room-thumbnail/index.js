import $ from 'jquery';

import '../rate-button';

import RoomThumbnail from './RoomThumbnail';
import { ROOM_THUMBNAIL_SELECTOR } from './const';

import './room-thumbnail.scss';

$(() => {
  $(ROOM_THUMBNAIL_SELECTOR).each((index, node) => {
    const $node = $(node);
    const roomThumbnail = new RoomThumbnail($node);
    roomThumbnail.render();
  });
});
