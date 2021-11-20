import './toggle-button.scss';
import $ from 'jquery';

class ToggleButton {
  constructor($component) {
    this.$component = $component;
    this.valueChanged = $component.attr('data-value-changed');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$component.on('click', (event) => this.onClick(event));
  }

  onClick(event) {
    if ($(event.target).hasClass('js-toggle-button')) return;

    this.$component.toggleClass('toggle-button_checked');

    this.triggerValueChanged();
  }

  triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }
}

$(() => {
  $('.js-toggle-button').map((index, node) => new ToggleButton($(node)));
});
