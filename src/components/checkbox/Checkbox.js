import './checkbox.scss';
import $ from 'jquery';

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
    if ($(event.target).hasClass('js-checkbox')) return;

    this.$component.toggleClass('checkbox_checked');

    this.triggerValueChanged();
  }

  triggerValueChanged() {
    if (this.valueChanged) {
      $(document).trigger(this.valueChanged);
    }
  }
}

$(() => {
  $('.js-checkbox').map((index, node) => new Checkbox($(node)));
});
