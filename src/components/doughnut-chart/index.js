import $ from 'jquery';

import DoughnutChart from './DoughnutChart';
import { DOUGHNUT_CHART_SELECTOR } from './const';

import './doughnut-chart.scss';

$(() => {
  $(DOUGHNUT_CHART_SELECTOR).each((index, node) => {
    const $node = $(node);
    const doughnutChart = new DoughnutChart($node);
    doughnutChart.render();
  });
});
