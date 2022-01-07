import $ from 'jquery';

import Chart from '../../libs/chart/Chart';

import {
  CHART_SELECTOR,
  DOT_SELECTOR,
  ITEMS,
} from './const';

class DoughnutChart {
  constructor($component) {
    this.$component = $component;
    this.$chart = $(CHART_SELECTOR, $component);
    this.$dots = $(DOT_SELECTOR, $component);
    this.ctx = this.$chart[0].getContext('2d');
  }

  init() {
    const items = JSON.parse(this.$component.attr(ITEMS));
    this.counters = items.map((item) => item.counter);
    this.colors = items.map((item) => item.color);
    this.chart = this.createChart(items);
    this.paintDots();
  }

  createChart() {
    const colors = this.colors.map((color) => {
      if (typeof color === 'string') return color;
      return this.createCanvasGradient(color);
    });

    const options = {
      ctx: this.ctx,
      counters: this.counters,
      colors,
    };

    return new Chart(options);
  }

  paintDots() {
    this.$dots.each((index, dot) => {
      if (typeof this.colors[index] === 'string') {
        $(dot).css('background', this.colors[index]);
      } else {
        const stops = this.colors[index].stops.map((stop) => `${stop.color} ${stop.percent}%`);
        const color = `linear-gradient(${this.colors[index].direction}deg, ${stops.join(', ')})`;
        $(dot).css('background', color);
      }
    });
  }

  createCanvasGradient({ direction, stops }) {
    const width = this.$chart.width();
    const canAng = direction - 90;
    const ang = (canAng - 90) * (Math.PI / 180);
    const hypt = width / Math.cos(ang);
    const fromTopRight = width - Math.sqrt(hypt * hypt - width * width);
    const diag = Math.sin(ang) * fromTopRight;
    const len = hypt + diag;

    const topX = width + Math.cos(-Math.PI / 2 + ang) * len;
    const topY = width + Math.sin(-Math.PI / 2 + ang) * len;
    const botX = width + Math.cos(Math.PI / 2 + ang) * len;
    const botY = width + Math.sin(Math.PI / 2 + ang) * len;

    const gradient = this.ctx.createLinearGradient(topX, topY, botX, botY);
    stops.forEach((stop) => gradient.addColorStop(stop.percent / 100, stop.color));

    return gradient;
  }
}

export default DoughnutChart;
