import './checkbox-list.scss';
import $ from 'jquery';

class CheckboxList {
  constructor($component) {
    this.$component = $component;
    this.$button = $('.js-checkbox-list__button', $component);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$button.on('click', (event) => this.onButtonClick(event.target));
  }

  onButtonClick() {
    this.$component.toggleClass('checkbox-list_open');
  }
}

$(() => {
  $('.js-checkbox-list').map((index, node) => new CheckboxList($(node)));
});
