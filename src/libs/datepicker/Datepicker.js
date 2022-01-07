import $ from 'jquery';
import OutsideDatepicker from 'air-datepicker';

import ruLocale from './ru';

import 'air-datepicker/air-datepicker.css';
import './datepicker.scss';

class Datepicker {
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
    const datepicker = new OutsideDatepicker($content[0], airOptions);

    this.$clear = Datepicker.findClearButton(datepicker);
    this.updateClearButtonVisibility(datepicker);
    Datepicker.fixButtonsType(datepicker);

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

  setState(first, second) {
    this.setTexts(first, second);
    this.setValues(first, second);
  }

  setValues(first, second) {
    const firstString = Datepicker.dateToString(first);
    const secondString = Datepicker.dateToString(second);

    this.$component.attr(this.DATE_FROM, firstString);
    this.$component.attr(this.DATE_TO, secondString);
  }

  setTexts(first, second) {
    if (!this.isSplit) return;

    const firstString = Datepicker.dateToString(first, 'ru');
    const secondString = Datepicker.dateToString(second, 'ru');

    $(this.texts[0]).val(firstString);
    $(this.texts[1]).val(secondString);
  }

  onCellSelect({ date, datepicker }) {
    const [first, second] = datepicker.selectedDates;
    const oneDateSelected = datepicker.selectedDates.length === 1;
    const twoDatesSelected = datepicker.selectedDates.length === 2;

    if (oneDateSelected) {
      Datepicker.fixFocusDisplay(date, datepicker);
      this.setState(first, '');
    } else if (twoDatesSelected) {
      this.setState(first, second);
    }

    this.update(datepicker);
  }

  onClearCalendarClick(datepicker) {
    datepicker.clear();
    if (this.isSplit) {
      $(this.texts[1]).val('');
    }
  }

  update(datepicker) {
    this.updateClearButtonVisibility(datepicker);
    this.triggerValueChanged();
  }

  updateClearButtonVisibility(datepicker) {
    const hasSelectedDates = datepicker.selectedDates.length !== 0;

    if (hasSelectedDates) {
      this.$clear.show();
    } else {
      this.$clear.hide();
    }
  }

  static findClearButton(datepicker) {
    const $buttons = $('button', datepicker.$buttons);
    return $($buttons[0]);
  }

  static fixButtonsType(datepicker) {
    const $buttons = $('button', datepicker.$buttons);
    $buttons.attr('type', 'button');
  }

  static fixFocusDisplay(date, datepicker) {
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

  static dateToString(date, locale = 'en') {
    if (typeof date === 'string') return date;
    return date.toLocaleDateString(locale);
  }
}

export default Datepicker;
