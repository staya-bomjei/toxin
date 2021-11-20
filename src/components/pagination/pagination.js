import './pagination.scss';
import $ from 'jquery';

class Pagination {
  constructor($component) {
    this.$component = $component;
    this.itemsCounter = Number($component.attr('data-items-count'));
    this.itemsPerPage = Number($component.attr('data-items-per-page'));
    this.pagesCounter = Math.ceil(this.itemsCounter / this.itemsPerPage);
    this.postfix = $component.attr('data-postfix');
    this.buttons = Array.from($('.js-pagination__number', $component)).map((item) => $(item));
    this.$toLeft = $('.js-pagination__to-left', $component);
    this.$toRight = $('.js-pagination__to-right', $component);
    this.$text = $('.js-pagination__text', $component);
    this.pageNumber = 0;
    this.updateState(1);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$toLeft.on('click', () => this.updateState(this.pageNumber - 1));
    this.$toRight.on('click', () => this.updateState(this.pageNumber + 1));
    this.buttons.forEach(($button) => {
      $button.on('click', (event) => this.onNumberButtonClick(event));
    });
  }

  onNumberButtonClick(event) {
    const text = $(event.target).html();
    if (text === '...') return;

    this.updateState(Number(text));
  }

  setButtons(texts) {
    this.buttons.forEach(($button, index) => {
      if (index < texts.length) {
        $button.html(texts[index]);
        $button.show();
      } else {
        $button.hide();
      }
    });
  }

  toggleButtonSelection(text) {
    const $button = this.buttons.find(($btn) => $btn.html() === String(text));
    if ($button) $button.toggleClass('pagination__number_current');
  }

  updateButtons(pageNumber) {
    this.toggleButtonSelection(this.pageNumber);
    this.setButtons(this.calcButtonsTexts(pageNumber));
    this.toggleButtonSelection(pageNumber);

    if (pageNumber === 1) {
      this.$toLeft.hide();
      this.$toRight.show();
    } else if (pageNumber === this.pagesCounter) {
      this.$toRight.hide();
      this.$toLeft.show();
    } else {
      this.$toRight.show();
      this.$toLeft.show();
    }

    this.pageNumber = pageNumber;
  }

  updateText(position) {
    const from = (position - 1) * this.itemsPerPage + 1;
    const to = Math.min(from + this.itemsPerPage, this.itemsCounter);
    const exp = Math.trunc(Math.log10(this.itemsCounter));
    const base = Math.trunc(this.itemsCounter / exp);

    this.$text.html(`${from} – ${to} из ${base * 10 ** (exp - 1)}+ ${this.postfix}`);
  }

  updateState(pageNumber) {
    if (this.pageNumber === pageNumber) return;

    this.updateButtons(pageNumber);
    this.updateText(pageNumber);
  }

  calcButtonsTexts(current, outer = 1) {
    const texts = [];
    const maxOuters = outer * 2 + 1;

    if (current - outer <= 1) {
      for (let i = 1; i <= this.pagesCounter && i <= maxOuters; i += 1) texts.push(i);
    } else if (current + outer >= this.pagesCounter) {
      for (let i = this.pagesCounter;
        i >= 1 && i > this.pagesCounter - maxOuters; i -= 1) texts.unshift(i);
    } else {
      for (let i = current - outer; i <= current + outer; i += 1) texts.push(i);
    }

    if (this.pagesCounter - texts[texts.length - 1] > 2) {
      texts.push('...', this.pagesCounter);
    } else {
      for (let i = texts[texts.length - 1] + 1; i <= this.pagesCounter; i += 1) texts.push(i);
    }

    if (texts[0] - 1 > 2) {
      texts.unshift(1, '...');
    } else {
      for (let i = texts[0] - 1; i >= 1; i -= 1) texts.unshift(i);
    }

    return texts.map((item) => String(item));
  }
}

$(() => {
  $('.js-pagination').map((index, node) => new Pagination($(node)));
});
