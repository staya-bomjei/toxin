import $ from 'jquery';

import {
  NUMBER_BUTTON_SELECTOR,
  PREV_BUTTON_SELECTOR,
  NEXT_BUTTON_SELECTOR,
  TEXT_SELECTOR,
  CURRENT_NUMBER_BUTTON,
  INIT_STATE,
  ITEMS_COUNT,
  ITEMS_PER_PAGE,
  POSTFIX,
} from './const';

class Pagination {
  constructor($component) {
    this.$component = $component;
    this.itemsCounter = Number($component.attr(ITEMS_COUNT));
    this.itemsPerPage = Number($component.attr(ITEMS_PER_PAGE));
    this.pagesCounter = Math.ceil(this.itemsCounter / this.itemsPerPage);
    this.postfix = $component.attr(POSTFIX);
    this.buttons = Array.from($(NUMBER_BUTTON_SELECTOR, $component)).map((item) => $(item));
    this.$prev = $(PREV_BUTTON_SELECTOR, $component);
    this.$next = $(NEXT_BUTTON_SELECTOR, $component);
    this.$text = $(TEXT_SELECTOR, $component);
  }

  init() {
    this.pageNumber = 0;
    const initState = Number(this.$component.attr(INIT_STATE));
    this._updateState(initState);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$prev.on('click', () => this._handlePrevButtonClick());
    this.$next.on('click', () => this._handleNextButtonClick());
    this.buttons.forEach(($button) => {
      $button.on('click', (event) => this._handleNumberButtonClick(event));
    });
  }

  _handleNumberButtonClick(event) {
    const text = $(event.target).html();
    if (text === '...') return;

    this._updateState(Number(text));
  }

  _handlePrevButtonClick() {
    this._updateState(this.pageNumber - 1);
  }

  _handleNextButtonClick() {
    this._updateState(this.pageNumber + 1);
  }

  _setButtons(texts) {
    this.buttons.forEach(($button, index) => {
      if (index < texts.length) {
        $button.html(texts[index]);
        $button.show();
      } else {
        $button.hide();
      }
    });
  }

  _toggleButtonSelection(text) {
    const $button = this.buttons.find(($btn) => $btn.html() === String(text));
    if ($button) $button.toggleClass(CURRENT_NUMBER_BUTTON);
  }

  _updateButtons(pageNumber) {
    this._toggleButtonSelection(this.pageNumber);
    this._setButtons(this._calcButtonsTexts(pageNumber));
    this._toggleButtonSelection(pageNumber);

    if (pageNumber === 1) {
      this.$prev.hide();
      this.$next.show();
    } else if (pageNumber === this.pagesCounter) {
      this.$next.hide();
      this.$prev.show();
    } else {
      this.$next.show();
      this.$prev.show();
    }

    this.pageNumber = pageNumber;
  }

  _updateText(position) {
    const from = (position - 1) * this.itemsPerPage + 1;
    const to = Math.min(from + this.itemsPerPage - 1, this.itemsCounter);
    const exp = Math.trunc(Math.log10(this.itemsCounter));

    this.$text.html(`${from} – ${to} из ${10 ** exp}+ ${this.postfix}`);
  }

  _updateState(pageNumber) {
    if (this.pageNumber === pageNumber) return;

    this._updateButtons(pageNumber);
    this._updateText(pageNumber);
  }

  _calcButtonsTexts(current, outer = 1) {
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

export default Pagination;
