import $ from 'jquery';

import LibsDatepicker from '../../libs/datepicker/Datepicker';

import {
  VALUE_CHANGED,
  INPUTS_SELECTOR,
  CONTENT_SELECTOR,
  INPUT_BOX_SELECTOR,
  TEXT_SELECTOR,
  DATEPICKER_OPEN,
  IS_SPLIT,
  IS_RANGE,
  SELECTED,
  DATE_FROM,
  DATE_TO,
} from './const';

class Datepicker {
  constructor($component) {
    this.$component = $component;
    this.valueChanged = $component.attr(VALUE_CHANGED);
    this.$inputs = $(INPUTS_SELECTOR, $component);
    this.$content = $(CONTENT_SELECTOR, $component);
    this.texts = $(TEXT_SELECTOR, this.$component);
    this.isSplit = this.$component.attr(IS_SPLIT) !== undefined;
    this.isRange = this.$component.attr(IS_RANGE) !== undefined;
    this.datepicker = this._createCalendar();
  }

  init() {
    const selected = JSON.parse(this.$component.attr(SELECTED));
    this.datepicker.selectDate(selected);

    this._handleOutOfComponentClick = this._handleOutOfComponentClick.bind(this);
    this._handleInputsClick = this._handleInputsClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    $(document).on('click', this._handleOutOfComponentClick);
    this.$inputs.on('click', this._handleInputsClick);
  }

  _handleAcceptButtonClick() {
    this.$component.removeClass(DATEPICKER_OPEN);
  }

  _handleOutOfComponentClick({ target }) {
    if (this.$component.has(target).length === 0) {
      this.$component.removeClass(DATEPICKER_OPEN);
    }
  }

  _handleInputsClick({ target }) {
    const $target = $(target);
    if ($target.closest(INPUT_BOX_SELECTOR).length !== 0) {
      this.$component.toggleClass(DATEPICKER_OPEN);
    }
  }

  _triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }

  _createCalendar() {
    const options = {
      $component: this.$component,
      $content: this.$content,
      texts: this.texts,
      isDatepicker: this.isDatepicker,
      isSplit: this.isSplit,
      range: this.isRange,
      triggerValueChanged: () => this._triggerValueChanged(),
      onAcceptButtonClick: () => this._handleAcceptButtonClick(),
      altField: this.texts[0],
      DATE_FROM,
      DATE_TO,
    };

    return new LibsDatepicker(options);
  }
}

export default Datepicker;
