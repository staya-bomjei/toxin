import { choiceCountable } from '../../libs/utils/utils';

import Counter from './Counter';
import { COUNTABLES } from './const';

export default class Summator extends Counter {
  constructor($component) {
    super($component);
    this.countables = JSON.parse(this.$component.attr(COUNTABLES));
  }

  sumAllCounters() {
    return this.rows
      .filter((row) => row.countables === null)
      .reduce((sum, row) => sum + Number(row.$counter.html()), 0);
  }

  calcDropdownValue() {
    const sum = this.sumAllCounters();
    const value = (sum) ? `${sum} ${choiceCountable(sum, this.countables)}` : '';
    const counters = this.rows
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
