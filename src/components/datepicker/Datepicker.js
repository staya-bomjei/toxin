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
    this.texts = $(TEXT_SELECTOR, $component);
    this.isSplit = $component.attr(IS_SPLIT) !== undefined;
    this.isRange = $component.attr(IS_RANGE) !== undefined;
    this.datepicker = this._createCalendar();
  }

  init() {
    const selected = JSON.parse(this.$component.attr(SELECTED));
    const { datepicker } = this;
    datepicker.selectDate(selected);

    this._handleOutOfComponentClick = this._handleOutOfComponentClick.bind(this);
    this._handleInputsClick = this._handleInputsClick.bind(this);
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $inputs } = this;

    $(document).on('click', this._handleOutOfComponentClick);
    $inputs.on('click', this._handleInputsClick);
  }

  _handleAcceptButtonClick() {
    const { $component } = this;

    $component.removeClass(DATEPICKER_OPEN);
  }

  _handleOutOfComponentClick({ target }) {
    const { $component } = this;

    if ($component.has(target).length === 0) {
      $component.removeClass(DATEPICKER_OPEN);
    }
  }

  _handleInputsClick({ target }) {
    const { $component } = this;
    const $target = $(target);

    if ($target.closest(INPUT_BOX_SELECTOR).length !== 0) {
      $component.toggleClass(DATEPICKER_OPEN);
    }
  }

  _triggerValueChanged() {
    const { valueChanged } = this;

    if (valueChanged) {
      $(document).trigger(valueChanged);
    }
  }

  _createCalendar() {
    const {
      $component,
      $content,
      texts,
      isSplit,
      isRange,
    } = this;

    const options = {
      $component,
      $content,
      texts,
      isSplit,
      range: isRange,
      triggerValueChanged: () => this._triggerValueChanged(),
      onAcceptButtonClick: () => this._handleAcceptButtonClick(),
      altField: texts[0],
      DATE_FROM,
      DATE_TO,
    };

    return new LibsDatepicker(options);
  }
}

export default Datepicker;
