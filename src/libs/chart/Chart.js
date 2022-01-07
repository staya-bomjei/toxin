import OutsideChart from 'chart.js/auto';

class Chart {
  constructor(options) {
    this.ctx = options.ctx;
    this.counters = options.counters;
    this.colors = options.colors;

    // в диаграмме на макете элементы должны быть отрисованы в обратном порядке
    this.counters.reverse();
    this.colors.reverse();

    const type = 'doughnut';
    const data = this.createData();
    const outsideOptions = Chart.createOutsideOptions();

    return new OutsideChart(this.ctx, { type, data, options: outsideOptions });
  }

  createData() {
    return {
      datasets: [{
        data: this.counters,
        backgroundColor: this.colors,
      }],
    };
  }

  static createOutsideOptions() {
    return {
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
  }
}

export default Chart;
