import $ from 'jquery';

import Inputmask from '../../libs/inputmask/inputmask';

import {
  MASKED_INPUT_SELECTOR,
  PLACEHOLDER,
} from './const';

import './text-field.scss';

$(() => {
  $(MASKED_INPUT_SELECTOR).each((_, node) => {
    const $node = $(node);
    const placeholder = $node.attr(PLACEHOLDER);
    const im = new Inputmask({
      $input: $node,
      inputFormat: 'dd.mm.yyyy',
      placeholder,
    });
    im.init();
  });
});
