import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import $ from 'jquery';

import { ruLocale } from './ru';

import './air-datepicker.scss';

export default class MyAirDatepicker {
  constructor(options) {
    this.$component = options.$component;
    this.texts = options.texts;
    this.isSplit = options.isSplit;
    this.triggerValueChanged = options.triggerValueChanged;
    this.onAcceptButtonClick = options.onAcceptButtonClick;
    this.DATE_FROM = options.DATE_FROM;
    this.DATE_TO = options.DATE_TO;

    const {
      range,
      altField,
      $content,
    } = options;

    const airOptions = this.createAirOptions({ range, altField });

    const datepicker = new AirDatepicker($content[0], airOptions);

    const $buttons = $('button', datepicker.$buttons);
    $buttons.attr('type', 'button');
    this.$clear = $($buttons[0]);
    this.updateClearButtonVisability(datepicker);

    this.$component.attr(this.DATE_FROM, '');
    this.$component.attr(this.DATE_TO, '');

    return datepicker;
  }

  createAirOptions(options) {
    return {
      ...options,
      inline: true,
      locale: ruLocale,
      altFieldDateFormat: 'd MMM',
      prevHtml: '',
      nextHtml: '',
      multipleDatesSeparator: ' - ',
      dateFormat: 'd MMM',
      moveToOtherMonthsOnSelect: false,
      navTitles: {
        days: 'MMMM yyyy',
      },
      onSelect: (dp) => this.onCellSelect(dp),
      buttons: [
        {
          content: 'очистить',
          className: 'clear',
          onClick: (dp) => this.onClearCalendarClick(dp),
        },
        {
          content: 'применить',
          className: 'accept',
          onClick: () => this.onAcceptButtonClick(),
        },
      ],
    };
  }

  onCellSelect({ date, datepicker }) {
    const [first, second] = datepicker.selectedDates;

    if (datepicker.selectedDates.length === 1) {
      if (this.isSplit) {
        $(this.texts[0]).val(first.toLocaleDateString('ru'));
        $(this.texts[1]).val('');
      }

      this.$component.attr(this.DATE_FROM, first.toLocaleDateString('en'));
      this.$component.attr(this.DATE_TO, '');
    } else if (datepicker.selectedDates.length === 2) {
      if (this.isSplit) {
        $(this.texts[0]).val(first.toLocaleDateString('ru'));
        $(this.texts[1]).val(second.toLocaleDateString('ru'));
      }

      this.$component.attr(this.DATE_FROM, first.toLocaleDateString('en'));
      this.$component.attr(this.DATE_TO, second.toLocaleDateString('en'));
    }

    if (datepicker.selectedDates.length === 1) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const selector = `.air-datepicker-cell[data-year=${year}][data-month=${month}][data-date=${day}]`;
      const $selectedCell = $(selector, datepicker.$datepicker);

      if ($selectedCell.hasClass('-focus-')) {
        $selectedCell.addClass('-range-from-');
        $selectedCell.addClass('-range-to-');
      }
    }

    this.updateClearButtonVisability(datepicker);
    this.triggerValueChanged();
  }

  onClearCalendarClick(dp) {
    dp.clear();
    if (this.isSplit) {
      $(this.texts[1]).val('');
    }
  }

  updateClearButtonVisability(dp) {
    if (dp.selectedDates.length) {
      this.$clear.show();
    } else {
      this.$clear.hide();
    }
  }
}
