import $ from 'jquery';

import DoughnutChart from './DoughnutChart';
import { DOUGHNUT_CHART_SELECTOR } from './const';

import './doughnut-chart.scss';

$(() => {
  $(DOUGHNUT_CHART_SELECTOR).map((index, node) => new DoughnutChart($(node)));
});
