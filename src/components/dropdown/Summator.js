import { choiceCountable } from '../../libs/utils/utils';

import Counter from './Counter';
import { COUNTABLES } from './const';

class Summator extends Counter {
  constructor($component) {
    super($component);
    this.countables = JSON.parse($component.attr(COUNTABLES));
  }

  _sumAllDropdownCountables() {
    return this.rows
      .filter((row) => row.countables === null)
      .reduce((sum, row) => sum + Number(row.$counter.html()), 0);
  }

  _calcDropdownText() {
    const { rows, countables } = this;
    const sum = this._sumAllDropdownCountables();
    const value = (sum) ? `${sum} ${choiceCountable(sum, countables)}` : '';
    const counters = rows
      .filter((row) => row.countables !== null)
      .map((row) => {
        const counter = Number(row.$counter.html());
        if (counter === 0) return '';
        return `${counter} ${choiceCountable(counter, row.countables)}`;
      });

    return [value, ...counters]
      .filter((string) => string !== '')
      .join(', ');
  }
}

export default Summator;
