import { DROPDOWN_SELECTOR } from '../dropdown/const';
import { DATEPICKER_SELECTOR as DP_SELECTOR } from '../datepicker/const';

const RESERVATION_SELECTOR = '.js-reservation';
const DATEPICKER_SELECTOR = `.js-reservation__datepicker > ${DP_SELECTOR}`;
const GUESTS_SELECTOR = `.js-reservation__guests-dropdown > ${DROPDOWN_SELECTOR}`;
const RENT_SELECTOR = '.js-reservation__rent';
const RENT_TOTAL_SELECTOR = '.js-reservation__rent-total';
const ADDITIONAL_TOTAL_SELECTOR = '.js-reservation__additional-total';
const TOTAL_COST_SELECTOR = '.js-reservation__total-cost';

const PRICE = 'data-price';
const DISCOUNT = 'data-discount';
const POSTFIX = 'data-postfix';
const DATEPICKER_VALUE_CHANGED = 'data-datepicker-value-changed';
const GUESTS_VALUE_CHANGED = 'data-guests-value-changed';
const ADDITIONALS = 'data-additionals';

export {
  RESERVATION_SELECTOR,
  DATEPICKER_SELECTOR,
  GUESTS_SELECTOR,
  RENT_SELECTOR,
  RENT_TOTAL_SELECTOR,
  ADDITIONAL_TOTAL_SELECTOR,
  TOTAL_COST_SELECTOR,
  PRICE,
  DISCOUNT,
  POSTFIX,
  DATEPICKER_VALUE_CHANGED,
  GUESTS_VALUE_CHANGED,
  ADDITIONALS,
};
