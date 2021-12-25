import $ from 'jquery';
import Chart from 'chart.js/auto';

import {
  CHART_SELECTOR,
  DOT_SELECTOR,
} from './const';

export default class DoughnutChart {
  constructor($component) {
    this.$component = $component;
    this.$chart = $(CHART_SELECTOR, $component);
    this.$dots = $(DOT_SELECTOR, $component);
    this.ctx = this.$chart[0].getContext('2d');
  }

  init() {
    const items = JSON.parse(this.$component.attr('data-items'));
    this.paintDots(items.map((item) => item.color));
    items.reverse();
    this.chart = this.createChart(items);
  }

  createChart(items) {
    const counters = items.map((item) => item.counter);
    const colors = items.map((item) => {
      if (typeof item.color === 'string') return item.color;
      return this.createCanvasGradient(item.color);
    });

    const data = {
      datasets: [{
        data: counters,
        backgroundColor: colors,
      }],
    };

    const options = {
      cutout: '89%',
      radius: 60,
      borderWidth: 2,
      aspectRatio: 1,
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: false,
      },
      interaction: {
        mode: null,
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: -10,
          bottom: 0,
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
    };

    return new Chart(this.ctx, { type: 'doughnut', data, options });
  }

  paintDots(colors) {
    this.$dots.each((index, dot) => {
      if (typeof colors[index] === 'string') {
        $(dot).css('background', colors[index]);
      } else {
        const stops = colors[index].stops.map((stop) => `${stop.color} ${stop.percent}%`);
        const color = `linear-gradient(${colors[index].direction}deg, ${stops.join(', ')})`;
        $(dot).css('background', color);
      }
    });
  }

  createCanvasGradient(options) {
    const { direction, stops } = options;

    const width = 120;
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

  render() {
    this.init();
  }
}
