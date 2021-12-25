import $ from 'jquery';
import Inputmask from 'inputmask';

import './text-field.scss';

$(() => {
  $('.js-text-field__input').each((index, node) => {
    const $node = $(node);
    const placeholder = $node.attr('placeholder');
    const im = new Inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder,
    });

    im.mask($node);
  });
});
