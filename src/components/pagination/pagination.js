import './pagination.scss';
import $ from 'jquery';

class Pagination {
  constructor($component) {
    this.$component = $component;
    this.$toLeftButton = $($component).find('.pagination__to-left-button');
    this.$toRightButton = $($component).find('.pagination__to-right-button');
    this.$text = $($component).find('.pagination__text');
    this.controlButtons = Array.from($($component).find('.pagination__control-button'));
    this.itemsCount = Number($($component).attr('data-items-count'));
    this.itemsPerPage = Number($($component).attr('data-items-per-page'));
    this.pagesCount = Math.ceil(this.itemsCount / this.itemsPerPage);
    this.text = $($component).attr('data-text');
    this.current = 0;
    this.update(1);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(this.$toLeftButton).on('click', () => this.onToLeftButtonClick());
    $(this.$toRightButton).on('click', () => this.onToRightButtonClick());
    this.controlButtons.forEach(($button) => {
      $($button).on('click', (event) => this.onControlButtonClick(event));
    });
  }

  onToLeftButtonClick() {
    this.update(this.current - 1);
  }

  onToRightButtonClick() {
    this.update(this.current + 1);
  }

  onControlButtonClick(event) {
    const text = $(event.target).html();
    if (text === '...') return;
    this.update(Number(text));
  }

  setControlButtonText(position, text) {
    $(this.controlButtons[position]).html(text);
  }

  setControlButtonCurrent(position) {
    $(this.controlButtons[position]).addClass('pagination__control-button_current');
  }

  unsetControlButtonCurrent(position) {
    $(this.controlButtons[position]).removeClass('pagination__control-button_current');
  }

  updateButtons(position) {
    for (let i = 0; i < this.controlButtons.length; i += 1) {
      if ($(this.controlButtons[i]).html() === String(this.current)) {
        this.unsetControlButtonCurrent(i);
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
      this.setControlButtonText(i, pagination[i]);
      $(this.controlButtons[i]).show();
      if (pagination[i] === position) {
        this.setControlButtonCurrent(i);
      }
    }
    for (let i = pagination.length; i < this.controlButtons.length; i += 1) {
      $(this.controlButtons[i]).hide();
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
    this.$text.html(`${from} – ${to} из ${temp * 10 ** (over - 1)}+ ${this.text}`);
  }

  update(position) {
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
