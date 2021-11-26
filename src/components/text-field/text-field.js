import './text-field.scss';
import Inputmask from 'inputmask';
import $ from 'jquery';

$(
  () => {
    const im = new Inputmask({ alias: 'datetime', inputFormat: 'dd.mm.yyyy', placeholder: '__.__.____' });
    im.mask($('.js-text-field__input_masked'));
  },
);
