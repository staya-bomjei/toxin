import $ from 'jquery';
import Inputmask from 'inputmask';

import {
  TEXT_FIELD_INPUT_SELECTOR,
  PLACEHOLDER,
} from './const';

import './text-field.scss';

$(() => {
  $(TEXT_FIELD_INPUT_SELECTOR).each((index, node) => {
    const $node = $(node);
    const placeholder = $node.attr(PLACEHOLDER);
    const im = new Inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder,
    });

    im.mask($node);
  });
});
