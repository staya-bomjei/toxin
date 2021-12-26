import OutsideInputmask from 'inputmask';

export default class Inputmask {
  constructor({ $input, inputFormat, placeholder }) {
    const options = {
      alias: 'datetime',
      inputFormat,
      placeholder,
    };

    this.outsideInputmask = new OutsideInputmask(options);
    this.$input = $input;
  }

  render() {
    this.outsideInputmask.mask(this.$input);
  }
}
