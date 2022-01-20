import $ from 'jquery';

import { choiceCountable, makeCurrency } from '../../libs/utils/utils';
import { VALUE } from '../dropdown/const';
import { DATE_FROM, DATE_TO } from '../datepicker/const';

import {
  PRICE,
  DISCOUNT,
  POSTFIX,
  DATEPICKER_SELECTOR,
  GUESTS_SELECTOR,
  RENT_SELECTOR,
  RENT_TOTAL_SELECTOR,
  ADDITIONAL_TOTAL_SELECTOR,
  TOTAL_COST_SELECTOR,
  DATEPICKER_VALUE_CHANGED,
  GUESTS_VALUE_CHANGED,
  ADDITIONALS,
} from './const';

class Reservation {
  constructor($component) {
    this.$component = $component;
    this.price = Number($component.attr(PRICE));
    this.discount = Number($component.attr(DISCOUNT));
    this.postfix = $component.attr(POSTFIX);
    this.datepickerValueChanged = $component.attr(DATEPICKER_VALUE_CHANGED);
    this.guestsValueChanged = $component.attr(GUESTS_VALUE_CHANGED);
    this.additionals = JSON.parse($component.attr(ADDITIONALS));
    this.$datepicker = $($(DATEPICKER_SELECTOR, $component)[0]);
    this.$guests = $($(GUESTS_SELECTOR, $component)[0]);
    this.$rent = $(RENT_SELECTOR, $component);
    this.$rentTotal = $(RENT_TOTAL_SELECTOR, $component);
    this.$additionalTotal = $(ADDITIONAL_TOTAL_SELECTOR, $component);
    this.$totalCost = $(TOTAL_COST_SELECTOR, $component);
  }

  init() {
    this._update();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    $(document).on(this.datepickerValueChanged, () => this._handleDatepickerValueChanged());
    $(document).on(this.guestsValueChanged, () => this._handleGuestsValueChanged());
  }

  _handleDatepickerValueChanged() {
    this._update();
  }

  _handleGuestsValueChanged() {
    this._update();
  }

  _update() {
    this._updateRent();
    this._updateAdditional();
    this._updateTotalCost();
  }

  _updateRent() {
    const priceCurrency = makeCurrency(this.price, this.postfix);
    const days = this._countDays();
    const dayCountable = choiceCountable(days, ['сутки', 'суток', 'суток']);
    this.$rent.html(`${priceCurrency} x ${days} ${dayCountable}`);

    const rentTotalCurrency = makeCurrency(this.price * days, this.postfix);
    this.$rentTotal.html(rentTotalCurrency);
  }

  _updateAdditional() {
    const additionalTotalCurrency = makeCurrency(this._calcAdditional(), this.postfix);
    this.$additionalTotal.html(additionalTotalCurrency);
  }

  _updateTotalCost() {
    const totalCostCurrency = makeCurrency(this._calcTotalCost(), this.postfix);
    this.$totalCost.html(totalCostCurrency);
  }

  _countDays() {
    const msFrom = Date.parse(this.$datepicker.attr(DATE_FROM));
    const msTo = Date.parse(this.$datepicker.attr(DATE_TO));
    const msPerDay = 1000 * 60 * 60 * 24;
    return (msTo - msFrom) / msPerDay - 1;
  }

  _calcAdditional() {
    return this.$guests.attr(VALUE)
      .split(',')
      .map((item) => Number(item))
      .reduce((sum, guestCounter, index) => (
        sum + guestCounter * this.additionals[index]
      ), 0);
  }

  _calcTotalCost() {
    const days = this._countDays();
    const additional = this._calcAdditional();
    return this.price * days - this.discount + additional;
  }
}

export default Reservation;
