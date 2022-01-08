import $ from 'jquery';

import '../dropdown';
import '../button';

import Reservation from './Reservation';
import { RESERVATION_SELECTOR } from './const';

import './reservation.scss';

$(() => {
  $(RESERVATION_SELECTOR).each((_, node) => {
    const $node = $(node);
    const reservation = new Reservation($node);
    reservation.init();
  });
});
