import $ from 'jquery';

import { choiceCountable, makeCurrency } from '../../libs/utils/utils';
import { VALUE, DATE_FROM, DATE_TO } from '../dropdown/const';

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

export default class Reservation {
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
    this.update();
  }

  attachEventHandlers() {
    $(document).on(this.datepickerValueChanged, () => this.handleDatepickerValueChanged());
    $(document).on(this.guestsValueChanged, () => this.handleGuestsValueChanged());
  }

  handleDatepickerValueChanged() {
    this.update();
  }

  handleGuestsValueChanged() {
    this.update();
  }

  update() {
    this.updateRent();
    this.updateAdditional();
    this.updateTotalCost();
  }

  updateRent() {
    const priceCurrency = makeCurrency(this.price, this.postfix);
    const days = this.countDays();
    const dayCountable = choiceCountable(days, ['сутки', 'суток', 'суток']);
    this.$rent.html(`${priceCurrency} x ${days} ${dayCountable}`);

    const rentTotalCurrency = makeCurrency(this.price * days, this.postfix);
    this.$rentTotal.html(rentTotalCurrency);
  }

  updateAdditional() {
    const additionalTotalCurrency = makeCurrency(this.calcAdditional(), this.postfix);
    this.$additionalTotal.html(additionalTotalCurrency);
  }

  updateTotalCost() {
    const totalCostCurrency = makeCurrency(this.calcTotalCost(), this.postfix);
    this.$totalCost.html(totalCostCurrency);
  }

  countDays() {
    const msFrom = Date.parse(this.$datepicker.attr(DATE_FROM));
    const msTo = Date.parse(this.$datepicker.attr(DATE_TO));
    const msPerDay = 1000 * 60 * 60 * 24;
    return (msTo - msFrom) / msPerDay - 1;
  }

  calcAdditional() {
    const guests = this.$guests.attr(VALUE)
      .split(',')
      .map((item) => Number(item));

    return guests.reduce((sum, guestCounter, index) => (
      sum + guestCounter * this.additionals[index]
    ), 0);
  }

  calcTotalCost() {
    const days = this.countDays();
    const additional = this.calcAdditional();
    return this.price * days - this.discount + additional;
  }

  render() {
    this.init();
    this.attachEventHandlers();
  }
}
