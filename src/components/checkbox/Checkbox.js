import './checkbox.scss';
import $ from 'jquery';

const CHECKBOX_SELECTOR = '.js-checkbox';
const CHECKBOX_CLASS = 'checkbox';
const CHECKBOX_CHECKED_CLASS = 'checkbox_checked';

class Checkbox {
  constructor($component) {
    this.$component = $component;
    this.valueChanged = $component.attr('data-value-changed');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$component.on('click', (event) => this.handleComponentClick(event));
  }

  handleComponentClick(event) {
    if ($(event.target).hasClass(CHECKBOX_CLASS)) return;

    this.$component.toggleClass(CHECKBOX_CHECKED_CLASS);

    this.triggerValueChanged();
  }

  triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }
}

$(() => {
  $(CHECKBOX_SELECTOR).map((index, node) => new Checkbox($(node)));
});
