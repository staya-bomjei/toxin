import OutsideChart from 'chart.js/auto';

class Chart {
  constructor(options) {
    this.ctx = options.ctx;
    this.counters = options.counters;
    this.colors = options.colors;
    this.radius = options.radius;

    // в диаграмме на макете элементы должны быть отрисованы в обратном порядке
    this.counters.reverse();
    this.colors.reverse();

    const type = 'doughnut';
    const data = this._createData();
    const outsideOptions = Chart.createOutsideOptions();

    return new OutsideChart(this.ctx, {
      type,
      data,
      options: { ...outsideOptions, radius: options.radius },
    });
  }

  _createData() {
    const { counters, colors } = this;

    return {
      datasets: [{
        data: counters,
        backgroundColor: colors,
      }],
    };
  }

  static createOutsideOptions() {
    return {
      cutout: '89%',
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
  }
}

export default Chart;
