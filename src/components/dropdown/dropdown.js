import './dropdown.scss';
import $ from 'jquery';

class Dropdown {
  constructor($component) {
    this.$component = $component;
    this.$dropdown = $($component).find('.dropdown__dropdown');
    this.$text = $($component).find('.dropdown__text');
    this.placeholder = $($component).attr('data-placeholder');
    this.maxLen = $($component).attr('data-max-len');
    this.isSummator = $($component).hasClass('dropdown_summator');
    if (this.isSummator) {
      this.countables = JSON.parse($($component).attr('data-countables'));
      this.$clear = $($component).find('.dropdown__clear-button');
      this.$accept = $($component).find('.dropdown__accept-button');
    }
    this.rows = this.getRows();
    this.updateText();
    this.updateClearButtonVisability();
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(this.$dropdown).on('click', (event) => this.onDropdownClick(event));
    $(this.$clear).on('click', () => this.onClearButtonClick());
    $(this.$accept).on('click', (event) => this.onAcceptButtonClick(event));

    this.rows.forEach((row) => {
      $(row.$minus).on('click', () => this.onMinusClick(row.$minus, row.$counter));
      $(row.$plus).on('click', () => this.onPlusClick(row.$minus, row.$counter));
    });
  }

  setText(string) {
    let text = string.substring(0, this.maxLen);

    if (string.length >= this.maxLen) text += '...';

    this.$text.html(text);
  }

  getRows() {
    const rows = Array.from(this.$component.find('.dropdown__row'));

    return rows.map(($row) => {
      const resultObject = {
        $minus: $($row).find('.dropdown__button-minus'),
        $counter: $($row).find('.dropdown__counter'),
        $plus: $($row).find('.dropdown__button-plus'),
      };

      if (this.isSummator) return resultObject;

      const countables = JSON.parse($($row).attr('data-row-countables'));

      return {
        countables,
        ...resultObject,
      };
    });
  }

  onDropdownClick() {
    $(this.$component).toggleClass('dropdown_open');
    this.updateText();
  }

  onMinusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) return;
    if (counter === 1) $($minus).removeClass('dropdown__button-minus_active');

    $counter.html(counter - 1);

    this.updateText();
    this.updateClearButtonVisability();
  }

  onPlusClick($minus, $counter) {
    const counter = Number($counter.html());

    if (counter === 0) {
      $($minus).addClass('dropdown__button-minus_active');
    }

    $counter.html(counter + 1);

    this.updateText();
    this.updateClearButtonVisability();
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
    $(this.$component).removeClass('dropdown_expanded');
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
    } else if (this.isSummator) {
      const sum = this.sumAllCounts();
      this.setText(`${sum} ${Dropdown.choiceCountable(sum, this.countables)}`);
    } else {
      this.setText(this.getSentence());
    }
  }

  updateClearButtonVisability() {
    if (!this.isSummator) return;

    if (this.sumAllCounts() === 0) {
      this.$clear.hide();
    } else {
      this.$clear.show();
    }
  }
}

$(() => {
  $('.js-dropdown').map((index, node) => new Dropdown($(node)));
});
