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

    const airOptions = this._createAirOptions({ range, altField });
    const datepicker = new OutsideDatepicker($content[0], airOptions);

    this.$clear = Datepicker.findClearButton(datepicker);
    this._updateClearButtonVisibility(datepicker);
    Datepicker.fixButtonsType(datepicker);

    return datepicker;
  }

  _createAirOptions(options) {
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
      onSelect: (dp) => this._onCellSelect(dp),
      buttons: [
        {
          content: 'очистить',
          className: 'clear',
          onClick: (dp) => this._onClearCalendarClick(dp),
        },
        {
          content: 'применить',
          className: 'accept',
          onClick: () => this.onAcceptButtonClick(),
        },
      ],
    };
  }

  _setState(first, second) {
    this._setTexts(first, second);
    this._setValues(first, second);
  }

  _setValues(first, second) {
    const { $component, DATE_FROM, DATE_TO } = this;
    const firstString = Datepicker.dateToString(first);
    const secondString = Datepicker.dateToString(second);

    $component.attr(DATE_FROM, firstString);
    $component.attr(DATE_TO, secondString);
  }

  _setTexts(first, second) {
    const { isSplit, texts } = this;

    if (!isSplit) return;

    const firstString = Datepicker.dateToString(first, 'ru');
    const secondString = Datepicker.dateToString(second, 'ru');

    $(texts[0]).val(firstString);
    $(texts[1]).val(secondString);
  }

  _onCellSelect({ datepicker }) {
    const [first, second] = datepicker.selectedDates;
    const oneDateSelected = datepicker.selectedDates.length === 1;
    const twoDatesSelected = datepicker.selectedDates.length === 2;

    if (oneDateSelected) {
      Datepicker.fixFocusDisplay(first, datepicker);
      this._setState(first, '');
    } else if (twoDatesSelected) {
      this._setState(first, second);
    }

    this._update(datepicker);
  }

  _onClearCalendarClick(datepicker) {
    const { isSplit, texts } = this;

    datepicker.clear();
    if (isSplit) {
      $(texts[1]).val('');
    }
  }

  _update(datepicker) {
    this._updateClearButtonVisibility(datepicker);
    this.triggerValueChanged();
  }

  _updateClearButtonVisibility(datepicker) {
    const { $clear } = this;
    const hasSelectedDates = datepicker.selectedDates.length !== 0;

    if (hasSelectedDates) {
      $clear.show();
    } else {
      $clear.hide();
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
