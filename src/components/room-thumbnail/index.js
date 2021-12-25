import $ from 'jquery';

import '../rate-button';

import RoomThumbnail from './RoomThumbnail';
import { ROOM_THUMBNAIL_SELECTOR } from './const';

import './room-thumbnail.scss';

$(() => {
  $(ROOM_THUMBNAIL_SELECTOR).map((index, node) => new RoomThumbnail($(node)));
});
