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
    const { $component } = this;
    this.pageNumber = 0;
    const initState = Number($component.attr(INIT_STATE));
    this._updateState(initState);
    this._handlePrevButtonClick = this._handlePrevButtonClick.bind(this);
    this._handleNextButtonClick = this._handleNextButtonClick.bind(this);
    this._handleNumberButtonClick = this._handleNumberButtonClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $prev, $next, buttons } = this;

    $prev.on('click', this._handlePrevButtonClick);
    $next.on('click', this._handleNextButtonClick);
    buttons.forEach(($button) => {
      $button.on('click', this._handleNumberButtonClick);
    });
  }

  _handleNumberButtonClick({ target }) {
    const text = $(target).html();
    if (text === '...') return;

    this._updateState(Number(text));
  }

  _handlePrevButtonClick() {
    const { pageNumber } = this;

    this._updateState(pageNumber - 1);
  }

  _handleNextButtonClick() {
    const { pageNumber } = this;

    this._updateState(pageNumber + 1);
  }

  _setButtons(texts) {
    const { buttons } = this;

    buttons.forEach(($button, index) => {
      if (index < texts.length) {
        $button.html(texts[index]);
        $button.show();
      } else {
        $button.hide();
      }
    });
  }

  _toggleButtonSelection(text) {
    const { buttons } = this;

    const $button = buttons.find(($btn) => $btn.html() === String(text));
    if ($button) $button.toggleClass(CURRENT_NUMBER_BUTTON);
  }

  _updateButtons(pageNumber) {
    this._toggleButtonSelection(this.pageNumber);
    this._setButtons(this._calcButtonsTexts(pageNumber));
    this._toggleButtonSelection(pageNumber);

    const { $prev, $next, pagesCounter } = this;
    if (pageNumber === 1) {
      $prev.hide();
      $next.show();
    } else if (pageNumber === pagesCounter) {
      $next.hide();
      $prev.show();
    } else {
      $next.show();
      $prev.show();
    }

    this.pageNumber = pageNumber;
  }

  _updateText(position) {
    const { itemsPerPage, itemsCounter, postfix } = this;
    const from = (position - 1) * itemsPerPage + 1;
    const to = Math.min(from + itemsPerPage - 1, itemsCounter);
    const exp = Math.trunc(Math.log10(itemsCounter));

    this.$text.html(`${from} – ${to} из ${10 ** exp}+ ${postfix}`);
  }

  _updateState(pageNumber) {
    const { pageNumber: originalPageNumber } = this;

    if (originalPageNumber === pageNumber) return;

    this._updateButtons(pageNumber);
    this._updateText(pageNumber);
  }

  _calcButtonsTexts(current, outer = 1) {
    const { pagesCounter } = this;
    const texts = [];
    const maxOuters = outer * 2 + 1;

    if (current - outer <= 1) {
      for (let i = 1; i <= this.pagesCounter && i <= maxOuters; i += 1) texts.push(i);
    } else if (current + outer >= pagesCounter) {
      for (let i = pagesCounter;
        i >= 1 && i > pagesCounter - maxOuters; i -= 1) texts.unshift(i);
    } else {
      for (let i = current - outer; i <= current + outer; i += 1) texts.push(i);
    }

    if (pagesCounter - texts[texts.length - 1] > 2) {
      texts.push('...', pagesCounter);
    } else {
      for (let i = texts[texts.length - 1] + 1; i <= pagesCounter; i += 1) texts.push(i);
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
