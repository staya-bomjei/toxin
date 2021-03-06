import $ from 'jquery';

import Chart from '../../libs/chart/Chart';

import {
  CHART_WRAPPER_SELECTOR,
  CHART_SELECTOR,
  DOT_SELECTOR,
  ITEMS,
  SIZE,
} from './const';

class DoughnutChart {
  constructor($component) {
    this.$component = $component;
    this.$chartWrapper = $(CHART_WRAPPER_SELECTOR, $component);
    this.$chart = $(CHART_SELECTOR, $component);
    this.$dots = $(DOT_SELECTOR, $component);
    this.ctx = this.$chart[0].getContext('2d');
  }

  init() {
    const items = JSON.parse(this.$component.attr(ITEMS));
    this.counters = items.map((item) => item.counter);
    this.colors = items.map((item) => item.color);

    const size = JSON.parse(this.$component.attr(SIZE));
    this.$chartWrapper.css('width', size);
    this.$chartWrapper.css('height', size);
    this.chart = this._createChart(size / 2);
    this._paintDots();
  }

  _createChart(radius) {
    const colors = this.colors.map((color) => {
      if (typeof color === 'string') return color;
      return this._createCanvasGradient(color);
    });

    const { ctx, counters } = this;
    const options = {
      ctx,
      counters,
      colors,
      radius,
    };

    return new Chart(options);
  }

  _paintDots() {
    const { $dots, colors } = this;

    $dots.each((index, dot) => {
      if (typeof colors[index] === 'string') {
        $(dot).css('background', colors[index]);
      } else {
        const stops = colors[index].stops.map((stop) => `${stop.color} ${stop.percent}%`);
        const color = `linear-gradient(${colors[index].direction}deg, ${stops.join(', ')})`;
        $(dot).css('background', color);
      }
    });
  }

  _createCanvasGradient({ direction, stops }) {
    const { $chart, ctx } = this;
    const width = $chart.width();
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

    const gradient = ctx.createLinearGradient(topX, topY, botX, botY);
    stops.forEach((stop) => gradient.addColorStop(stop.percent / 100, stop.color));

    return gradient;
  }
}

export default DoughnutChart;
