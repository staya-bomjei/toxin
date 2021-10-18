import './dropdown.scss';
import $ from 'jquery';

class Dropdown {
  constructor($component) {
    this.$component = $component;
    this.$dropdown = $($component).find('.dropdown__dropdown');
    this.$text = $($component).find('.dropdown__text');
    this.rows = this.getRows();
    this.placeholder = $($component).attr('data-placeholder');
    this.max_len = $($component).attr('data-max-len');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(this.$dropdown).on('click', (event) => this.onDropdownClick(event));

    this.rows.forEach((row) => {
      $(row.$minus).on('click', (event) => this.onMinusClick(event));
      $(row.$plus).on('click', (event) => this.onPlusClick(event));
    });
  }

  setText(string) {
    let text = string.substring(0, this.max_len);

    if (string.length > this.max_len) text += '...';

    this.$text.html(text);
  }

  getRows() {
    const rows = Array.from(this.$component.find('.dropdown__row'));

    return rows.map(($row) => {
      const $title = $($row).find('.dropdown__title');
      const $minus = $($row).find('.dropdown__button-minus');
      const $count = $($row).find('.dropdown__count');
      const $plus = $($row).find('.dropdown__button-plus');

      return {
        $title,
        $minus,
        $count,
        $plus,
      };
    });
  }

  onDropdownClick() {
    $(this.$component).toggleClass('dropdown_expanded');
    this.updateText();
  }

  onMinusClick(event) {
    const $minus = event.target;
    const $count = $($minus).siblings('.dropdown__count');
    const count = Number($count.html());

    if (count === 0) return;
    if (count === 1) $($minus).removeClass('dropdown__button-minus_active');

    $count.html(count - 1);

    this.updateText();
  }

  onPlusClick(event) {
    const $plus = event.target;
    const $count = $($plus).siblings('.dropdown__count');
    const count = Number($count.html());

    if (count === 0) {
      const $minus = $($plus).siblings('.dropdown__button-minus');
      $($minus).addClass('dropdown__button-minus_active');
    }

    $count.html(count + 1);

    this.updateText();
  }

  sumAllCounts() {
    return this.rows.reduce((sum, row) => sum + Number(row.$count.html()), 0);
  }

  getSentence() {
    return this.rows
      .map((row) => {
        const count = Number(row.$count.html());
        if (count === 0) return '';

        const title = row.$title.html();
        return `${count} ${title}`;
      })
      .filter((string) => string !== '')
      .join(', ');
  }

  updateText() {
    if (this.sumAllCounts() === 0) {
      this.setText(this.placeholder);
    } else {
      this.setText(this.getSentence());
    }
  }
}

$(() => {
  $('.js-dropdown').map((index, node) => new Dropdown($(node)));
});
