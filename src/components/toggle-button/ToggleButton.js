import './toggle-button.scss';
import $ from 'jquery';

const TOGGLE_BUTTON_SELECTOR = '.js-toggle-button';
const TOGGLE_BUTTON_CLASS = 'toggle-button';
const TOGGLE_BUTTON_CHECKED = 'toggle-button_checked';
const VALUE_CHANGED_ATTR = 'data-value-changed';

class ToggleButton {
  constructor($component) {
    this.$component = $component;
    this.valueChanged = $component.attr(VALUE_CHANGED_ATTR);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$component.on('click', (event) => this.handleComponentClick(event));
  }

  handleComponentClick(event) {
    if ($(event.target).hasClass(TOGGLE_BUTTON_CLASS)) return;

    this.$component.toggleClass(TOGGLE_BUTTON_CHECKED);

    this.triggerValueChanged();
  }

  triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }
}

$(() => {
  $(TOGGLE_BUTTON_SELECTOR).map((index, node) => new ToggleButton($(node)));
});
