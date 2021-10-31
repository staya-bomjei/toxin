import './dropdown.scss';
import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import $ from 'jquery';

class Dropdown {
  constructor($component) {
    this.$component = $component;
    [this.$dropdowns] = $($component).find('.dropdown__dropdowns');
    [this.$content] = $($component).find('.dropdown__content');
    this.placeholder = $($component).attr('data-placeholder');
    this.maxLen = $($component).attr('data-max-len');
    this.type = $($component).attr('data-type');
    if (this.isDatepicker()) {
      this.texts = $($component).find('.dropdown__text');
      this.isSplit = $($component).attr('data-is-split') !== undefined;
      const range = $($component).attr('data-is-range') !== undefined;
      this.datepicker = this.createCalendar({ range });
      const selected = JSON.parse($($component).attr('data-selected'));
      this.datepicker.selectDate(selected);
    } else {
      [this.$text] = $($component).find('.dropdown__text');
      if (this.isSummator()) {
        this.countables = JSON.parse($($component).attr('data-countables'));
        this.$clear = $($component).find('.dropdown__clear-button');
        this.$accept = $($component).find('.dropdown__accept-button');
        this.rows = this.getRows();
        this.updateClearButtonVisability();
      } else {
        this.rows = this.getRows();
      }
      this.updateText();
    }
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(document).on('click', (event) => this.onOutOfComponentClick(event));
    $(this.$dropdowns).on('click', (event) => this.onDropdownsClick(event));

    if (!this.isDatepicker()) {
      if (this.isSummator()) {
        $(this.$clear).on('click', () => this.onClearButtonClick());
        $(this.$accept).on('click', (event) => this.onAcceptButtonClick(event));
      }
      this.rows.forEach((row) => {
        $(row.$minus).on('click', () => this.onMinusClick(row.$minus, row.$counter));
        $(row.$plus).on('click', () => this.onPlusClick(row.$minus, row.$counter));
      });
    }
  }

  setText(string) {
    let text = string.substring(0, this.maxLen);

    if (string.length >= this.maxLen) text += '...';

    $(this.$text).val(text);
  }

  getRows() {
    const rows = Array.from(this.$component.find('.dropdown__row'));

    return rows.map(($row) => {
      const resultObject = {
        $minus: $($row).find('.dropdown__button-minus'),
        $counter: $($row).find('.dropdown__counter'),
        $plus: $($row).find('.dropdown__button-plus'),
      };

      if (this.isSummator()) return resultObject;

      const countables = JSON.parse($($row).attr('data-row-countables'));

      return {
        countables,
        ...resultObject,
      };
    });
  }

  onOutOfComponentClick(event) {
    if (!this.$component.is(event.target)
    && this.$component.has(event.target).length === 0) {
      $(this.$component).removeClass('dropdown_open');
    }
  }

  onDropdownsClick(event) {
    const $target = $(event.target);
    if ($target.closest('.dropdown__input-box').length !== 0) {
      $(this.$component).toggleClass('dropdown_open');
    }
  }

  onMinusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) return;
    if (counter === 1) $($minus).removeClass('dropdown__button-minus_active');

    $counter.html(counter - 1);

    this.updateText();
    if (this.isSummator()) {
      this.updateClearButtonVisability();
    }
  }

  onPlusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) {
      $($minus).addClass('dropdown__button-minus_active');
    }

    $counter.html(counter + 1);

    this.updateText();
    if (this.isSummator()) {
      this.updateClearButtonVisability();
    }
  }

  onClearButtonClick() {
    this.rows.forEach((row) => {
      $(row.$minus).removeClass('dropdown__button-minus_active');
      row.$counter.html('0');
    });
    this.updateText();
    this.updateClearButtonVisability();
  }

  onAcceptButtonClick() {
    $(this.$component).removeClass('dropdown_open');
  }

  static dateToString(date) {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('ru', options).slice(0, -1);
  }

  onCellSelect({ date, datepicker }) {
    if (this.isDatepicker() && this.isSplit) {
      const [first, second] = datepicker.selectedDates;
      if (datepicker.selectedDates.length === 1) {
        $(this.texts[0]).val(Dropdown.dateToString(first));
        $(this.texts[1]).val('');
      } else if (datepicker.selectedDates.length === 2) {
        $(this.texts[0]).val(Dropdown.dateToString(first));
        $(this.texts[1]).val(Dropdown.dateToString(second));
      }
    }
    if (datepicker.selectedDates.length === 1
    && datepicker.selectedDates[0].getTime() === date.getTime()) {
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
  }

  sumAllCounts() {
    return this.rows.reduce((sum, row) => sum + Number(row.$counter.html()), 0);
  }

  static choiceCountable(counter, countables) {
    if (counter === 1) {
      return countables[0];
    }

    if (counter > 10 && counter < 20) {
      return countables[2];
    }

    switch (counter % 10) {
      case 1:
        return countables[0];
      case 2:
      case 3:
      case 4:
        return countables[1];
      default:
        return countables[2];
    }
  }

  getSentence() {
    return this.rows
      .map((row) => {
        const counter = Number(row.$counter.html());
        if (counter === 0) return '';

        return `${counter} ${Dropdown.choiceCountable(counter, row.countables)}`;
      })
      .filter((string) => string !== '')
      .join(', ');
  }

  updateText() {
    if (this.sumAllCounts() === 0) {
      this.setText(this.placeholder);
    } else if (this.isSummator()) {
      const sum = this.sumAllCounts();
      this.setText(`${sum} ${Dropdown.choiceCountable(sum, this.countables)}`);
    } else {
      this.setText(this.getSentence());
    }
  }

  updateClearButtonVisability() {
    if (this.sumAllCounts() === 0) {
      this.$clear.hide();
    } else {
      this.$clear.show();
    }
  }

  createCalendar(additionalOptions = {}) {
    const options = {
      ...additionalOptions,
      inline: true,
      altField: this.texts[0],
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
          onClick: (dp) => dp.clear(),
        },
        {
          content: 'принять',
          onClick: () => this.onAcceptButtonClick(),
        },
      ],
    };

    return new AirDatepicker(this.$content, options);
  }

  isSummator() {
    return this.type === 'summator';
  }

  isDatepicker() {
    return this.type === 'datepicker';
  }
}

$(() => {
  $('.js-dropdown').map((index, node) => new Dropdown($(node)));
});
