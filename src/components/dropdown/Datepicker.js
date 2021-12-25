import $ from 'jquery';

import MyAirDatepicker from '../../libs/air-datepicker/MyAirDatepicker';

import Dropdown from './Dropdown';
import {
  TEXT_SELECTOR,
  DROPDOWN_OPEN,
  IS_SPLIT,
  IS_RANGE,
  SELECTED,
} from './const';

export default class Datepicker extends Dropdown {
  constructor($component) {
    super($component);
    this.texts = $(TEXT_SELECTOR, this.$component);
    this.isSplit = this.$component.attr(IS_SPLIT) !== undefined;
    this.isRange = this.$component.attr(IS_RANGE) !== undefined;
    this.datepicker = this.createCalendar({ range: this.isRange });
    const selected = JSON.parse(this.$component.attr(SELECTED));
    this.datepicker.selectDate(selected);
  }

  handleAcceptButtonClick() {
    this.$component.removeClass(DROPDOWN_OPEN);
  }

  createCalendar(additionalOptions = {}) {
    const options = {
      ...additionalOptions,
      $component: this.$component,
      $content: this.$content,
      texts: this.texts,
      isDatepicker: this.isDatepicker,
      isSplit: this.isSplit,
      triggerValueChanged: () => this.triggerValueChanged(),
      onAcceptButtonClick: () => this.handleAcceptButtonClick(),
      altField: this.texts[0],
    };

    return new MyAirDatepicker(options);
  }
}
