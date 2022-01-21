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

  init() {
    const { outsideInputmask, $input } = this;

    outsideInputmask.mask($input);
  }
}

export default Inputmask;
