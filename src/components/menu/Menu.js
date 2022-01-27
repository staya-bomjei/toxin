import $ from 'jquery';

import { ITEM_SELECTOR, ITEM_ACTIVE } from './const';

class Menu {
  constructor($component) {
    this.$component = $component;
    this.$items = $component.children();
    this.items = Array.from(this.$items);
  }

  init() {
    this._handleItemMouseDown = this._handleItemMouseDown.bind(this);
    this._handleOutOfComponentMouseDown = this._handleOutOfComponentMouseDown.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$items.each((_, element) => {
      $(element).on('mousedown', this._handleItemMouseDown);
    });

    $(document).on('mousedown', this._handleOutOfComponentMouseDown);
  }

  _handleItemMouseDown({ target }) {
    const $target = $(target);
    const $item = $target.closest(ITEM_SELECTOR);
    const needToSetActive = $item.hasClass(ITEM_ACTIVE);

    if (this._isTopmostItem($item)) {
      this._setAllItemsInactive();
    }

    if (needToSetActive) {
      Menu.setItemInactive($item);
    } else {
      $item.addClass(ITEM_ACTIVE);
    }
  }

  _handleOutOfComponentMouseDown({ target }) {
    const { $component } = this;

    if ($component.has(target).length === 0) {
      this._setAllItemsInactive();
    }
  }

  _isTopmostItem($item) {
    const [itemElement] = $item;

    return this.items.some((element) => element === itemElement);
  }

  _setAllItemsInactive() {
    this.$items.each((_, element) => {
      const $element = $(element);
      Menu.setItemInactive($element);
    });
  }

  static setItemInactive($item) {
    $item.removeClass(ITEM_ACTIVE);

    const $subitems = $(ITEM_SELECTOR, $item);
    $subitems.removeClass(ITEM_ACTIVE);
  }
}

export default Menu;
