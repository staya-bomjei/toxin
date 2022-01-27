import $ from 'jquery';

import { choiceCountable, makeCurrency } from '../../libs/utils/utils';
import { VALUE } from '../dropdown/const';
import { DATE_FROM, DATE_TO } from '../datepicker/const';

import {
  PRICE,
  DISCOUNT,
  SERVICE_CHARGE,
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
    this.serviceCharge = Number($component.attr(SERVICE_CHARGE));
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
    this._handleDatepickerValueChanged = this._handleDatepickerValueChanged.bind(this);
    this._handleGuestsValueChanged = this._handleGuestsValueChanged.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { datepickerValueChanged, guestsValueChanged } = this;

    $(document).on(datepickerValueChanged, this._handleDatepickerValueChanged);
    $(document).on(guestsValueChanged, this._handleGuestsValueChanged);
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
    const {
      price,
      postfix,
      $rent,
      $rentTotal,
    } = this;
    const priceCurrency = makeCurrency(price, postfix);
    const days = this._countDays();
    const dayCountable = choiceCountable(days, ['сутки', 'суток', 'суток']);
    $rent.html(`${priceCurrency} x ${days} ${dayCountable}`);

    const rentTotalCurrency = makeCurrency(price * days, postfix);
    $rentTotal.html(rentTotalCurrency);
  }

  _updateAdditional() {
    const { postfix, $additionalTotal } = this;
    const additionalTotalCurrency = makeCurrency(this._calcAdditional(), postfix);
    $additionalTotal.html(additionalTotalCurrency);
  }

  _updateTotalCost() {
    const { postfix, $totalCost } = this;
    const totalCostCurrency = makeCurrency(this._calcTotalCost(), postfix);
    $totalCost.html(totalCostCurrency);
  }

  _countDays() {
    const { $datepicker } = this;
    const msFrom = Date.parse($datepicker.attr(DATE_FROM));
    const msTo = Date.parse($datepicker.attr(DATE_TO));
    const msPerDay = 1000 * 60 * 60 * 24;
    return (msTo - msFrom) / msPerDay - 1;
  }

  _calcAdditional() {
    const { $guests, additionals } = this;
    return $guests.attr(VALUE)
      .split(',')
      .map((item) => Number(item))
      .reduce((sum, guestCounter, index) => (
        sum + guestCounter * additionals[index]
      ), 0);
  }

  _calcTotalCost() {
    const { price, discount, serviceCharge } = this;
    const days = this._countDays();
    const additional = this._calcAdditional();

    return price * days - discount + serviceCharge + additional;
  }
}

export default Reservation;
