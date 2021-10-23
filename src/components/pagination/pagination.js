import './pagination.scss';
import $ from 'jquery';

class Pagination {
  constructor($component) {
    this.$component = $component;
    this.$toLeftButton = $($component).find('.pagination__to-left-button');
    this.$toRightButton = $($component).find('.pagination__to-right-button');
    this.$text = $($component).find('.pagination__text');
    this.numberButtons = Array.from($($component).find('.pagination__number-button'));
    this.itemsCount = Number($($component).attr('data-items-count'));
    this.itemsPerPage = Number($($component).attr('data-items-per-page'));
    this.pagesCount = Math.ceil(this.itemsCount / this.itemsPerPage);
    this.postfix = $($component).attr('data-postfix');
    this.current = 0;
    this.updateComponent(1);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(this.$toLeftButton).on('click', () => this.onToLeftButtonClick());
    $(this.$toRightButton).on('click', () => this.onToRightButtonClick());
    this.numberButtons.forEach(($button) => {
      $($button).on('click', (event) => this.onNumberButtonClick(event));
    });
  }

  onToLeftButtonClick() {
    this.updateComponent(this.current - 1);
  }

  onToRightButtonClick() {
    this.updateComponent(this.current + 1);
  }

  onNumberButtonClick(event) {
    const text = $(event.target).html();
    if (text === '...') return;
    this.updateComponent(Number(text));
  }

  setNumberButtonText(position, text) {
    $(this.numberButtons[position]).html(text);
  }

  setNumberButtonCurrent(position) {
    $(this.numberButtons[position]).addClass('pagination__number-button_current');
  }

  unsetNumberButtonCurrent(position) {
    $(this.numberButtons[position]).removeClass('pagination__number-button_current');
  }

  updateButtons(position) {
    for (let i = 0; i < this.numberButtons.length; i += 1) {
      if ($(this.numberButtons[i]).html() === String(this.current)) {
        this.unsetNumberButtonCurrent(i);
      }
    }
    this.current = position;
    switch (position) {
      case 1:
        this.$toLeftButton.hide();
        this.$toRightButton.show();
        break;
      case this.pagesCount:
        this.$toRightButton.hide();
        this.$toLeftButton.show();
        break;
      default:
        this.$toRightButton.show();
        this.$toLeftButton.show();
    }

    const pagination = Pagination.calcPagination(this.pagesCount, position);
    for (let i = 0; i < pagination.length; i += 1) {
      this.setNumberButtonText(i, pagination[i]);
      $(this.numberButtons[i]).show();
      if (pagination[i] === position) {
        this.setNumberButtonCurrent(i);
      }
    }
    for (let i = pagination.length; i < this.numberButtons.length; i += 1) {
      $(this.numberButtons[i]).hide();
    }
  }

  updateText(position) {
    const from = (position - 1) * this.itemsPerPage + 1;
    let to = from + this.itemsPerPage;
    if (to > this.itemsCount) {
      to = this.itemsCount;
    }
    let over = 1;
    let temp = this.itemsCount;
    while (temp > 10) {
      over += 1;
      temp = Math.trunc(temp / 10);
    }
    this.$text.html(`${from} – ${to} из ${temp * 10 ** (over - 1)}+ ${this.postfix}`);
  }

  updateComponent(position) {
    if (this.current === position) return;

    this.updateButtons(position);
    this.updateText(position);
  }

  static calcPagination(count, current) {
    const aroundCurrent = [];
    if (current === 1) {
      for (let i = 1; i <= 3 && i <= count; i += 1) aroundCurrent.push(i);
    } else if (current === count) {
      for (let i = 1; i <= 3 && i <= count; i += 1) aroundCurrent.unshift(count - i + 1);
    } else {
      aroundCurrent.push(current - 1, current, current + 1);
    }

    if (aroundCurrent.length < 3) return aroundCurrent;

    const leftNumber = aroundCurrent[0];
    const leftInterval = [];
    if (leftNumber - 1 > 2) {
      leftInterval.push(1, '...');
    } else {
      for (let i = 1; i < leftNumber; i += 1) leftInterval.push(i);
    }

    const rightNumber = aroundCurrent[2];
    const rightInterval = [];
    if (count - rightNumber > 2) {
      rightInterval.push('...', count);
    } else {
      for (let i = rightNumber + 1; i <= count; i += 1) rightInterval.push(i);
    }

    return [...leftInterval, ...aroundCurrent, ...rightInterval];
  }
}

$(() => {
  $('.js-pagination').map((index, node) => new Pagination($(node)));
});
