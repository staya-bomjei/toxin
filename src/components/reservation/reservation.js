import './reservation.scss';
import $ from 'jquery';

class Reservation {
  constructor($component) {
    this.$component = $component;
    this.countables = ['сутки', 'суток', 'суток'];
    this.dpChanged = $component.attr('data-dp-changed');
    this.guestsChanged = $component.attr('data-guests-changed');
    this.price = Number($component.attr('data-price'));
    this.pricePerGuest = Number($component.attr('data-price-per-guest'));
    this.discount = Number($component.attr('data-discount'));
    this.postfix = $component.attr('data-postfix');
    this.$datepicker = $('.js-reservation__datepicker', $component);
    this.$guests = $('.js-reservation__guests', $component);
    this.$price = $('.js-reservation__price', $component);
    this.$rent = $('.js-reservation__rent', $component);
    this.$rentTotal = $('.js-reservation__rent-total', $component);
    this.$discount = $('.js-reservation__discount', $component);
    this.$additionalTotal = $('.js-reservation__additional-total', $component);
    this.$totalCost = $('.js-reservation__total-cost', $component);
    this.init();
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(document).on(this.dpChanged, () => this.onDateChange());
    $(document).on(this.guestsChanged, () => this.onGuestsChange());
  }

  onGuestsChange() {
    this.additional = this.getGuests() * this.pricePerGuest;
    this.$additionalTotal.html(this.toCurrency(this.additional));
    this.updateCalculator();
  }

  onDateChange() {
    const days = this.getDays();
    let rentString = '';
    rentString += this.toCurrency(this.price);
    rentString += ' x ';
    rentString += `${days} ${this.choiceCountable(days)}`;
    this.$rent.html(rentString);
    this.$rentTotal.html(this.toCurrency(days * this.price));
    this.updateCalculator();
  }

  updateCalculator() {
    const days = this.getDays();
    const totalCost = (days === 0) ? 0 : days * this.price + this.additional - this.discount;
    this.$totalCost.html(this.toCurrency(totalCost));
  }

  toCurrency(number) {
    return number.toLocaleString('ru') + this.postfix;
  }

  init() {
    this.$price.html(this.toCurrency(this.price));
    this.$discount.html(this.toCurrency(this.discount));
    this.onGuestsChange();
    this.onDateChange();
  }

  getDays() {
    const dataFrom = this.$datepicker.attr('data-from');
    const dataTo = this.$datepicker.attr('data-to');

    if (dataFrom === undefined || dataTo === '') return 0;

    const dateFrom = new Date(dataFrom);
    const dateTo = new Date(dataTo);
    const timeDiff = dateTo.getTime() - dateFrom.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    return dayDiff;
  }

  getGuests() {
    return Number(this.$guests.attr('data-value'));
  }

  choiceCountable(counter) {
    if (counter === 1) {
      return this.countables[0];
    }

    if (counter > 10 && counter < 20) {
      return this.countables[2];
    }

    switch (counter % 10) {
      case 1:
        return this.countables[0];
      case 2:
      case 3:
      case 4:
        return this.countables[1];
      default:
        return this.countables[2];
    }
  }
}

$(() => {
  $('.js-reservation').map((index, node) => new Reservation($(node)));
});
