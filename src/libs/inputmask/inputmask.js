import OutsideInputmask from 'inputmask';

class Inputmask {
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

export default Inputmask;
