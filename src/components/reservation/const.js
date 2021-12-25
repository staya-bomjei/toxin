import { DROPDOWN_SELECTOR } from '../dropdown/const';

export const RESERVATION_SELECTOR = '.js-reservation';
export const DATEPICKER_SELECTOR = `.js-reservation__datepicker > ${DROPDOWN_SELECTOR}`;
export const GUESTS_SELECTOR = `.js-reservation__guests-dropdown > ${DROPDOWN_SELECTOR}`;
export const RENT_SELECTOR = '.js-reservation__rent';
export const RENT_TOTAL_SELECTOR = '.js-reservation__rent-total';
export const ADDITIONAL_TOTAL_SELECTOR = '.js-reservation__additional-total';
export const TOTAL_COST_SELECTOR = '.js-reservation__total-cost';

export const PRICE = 'data-price';
export const DISCOUNT = 'data-discount';
export const POSTFIX = 'data-postfix';
export const DATEPICKER_VALUE_CHANGED = 'data-datepicker-value-changed';
export const GUESTS_VALUE_CHANGED = 'data-guests-value-changed';
export const ADDITIONALS = 'data-additionals';
