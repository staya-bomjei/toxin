import $ from 'jquery';

import LibsDatepicker from '../../libs/datepicker/Datepicker';

import Dropdown from './Dropdown';
import {
  TEXT_SELECTOR,
  DROPDOWN_OPEN,
  IS_SPLIT,
  IS_RANGE,
  SELECTED,
  DATE_FROM,
  DATE_TO,
} from './const';

class Datepicker extends Dropdown {
  constructor($component) {
    super($component);
    this.texts = $(TEXT_SELECTOR, this.$component);
    this.isSplit = this.$component.attr(IS_SPLIT) !== undefined;
    this.isRange = this.$component.attr(IS_RANGE) !== undefined;
    this.datepicker = this._createCalendar();
  }

  init() {
    super.init();

    const selected = JSON.parse(this.$component.attr(SELECTED));
    this.datepicker.selectDate(selected);
  }

  _handleAcceptButtonClick() {
    this.$component.removeClass(DROPDOWN_OPEN);
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
