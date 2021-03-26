<template>
  <div ref="chartContainer" :style="{ width: width, height: height }" />
</template>

<script>
import anychart from 'anychart';

export default {
  name: 'any-chart',
  data() {
    return {
      chart: null,
      dataTable: null,
      candlestickMapping: {
        open: 'open',
        high: 'high',
        low: 'low',
        close: 'close',
        value: 'high', // mandatory for displaying events on that value
      },
      volumeMapping: { x: 'date', value: 'volume' },
      stockPlot: null,
      stockSeries: null,
      volumePlot: null,
      volumeSeries: null,
      rangePicker: null,
      rangeSelector: null,
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    eventsA: {
      type: Array,
    },
    eventsB: {
      type: Array,
    },
    title: {
      type: String,
    },
    width: String,
    height: String,
  },
  watch: {
    data() {
      this.setData();
    },
    eventsA() {
      this.setEvents();
    },
    eventsB() {
      this.setEvents();
    },
    title() {
      this.setTitle();
    },
  },
  mounted() {
    this.renderChart();
    this.chart.listen('eventMarkerClick', function (e) {
      console.log(e.eventMarker);
    });
    this.setTitle();
    this.setData();
  },
  beforeDestroy() {
    this.chart.removeAllListeners();
  },
  updated() {
    this.setData();
  },
  methods: {
    renderChart() {
      this.dataTable && this.dataTable.remove();

      this.dataTable = anychart.data.table('date'); // `date` is the x axis
      // this.dataTable.addData([...this.data]);

      const candlestickMapping = this.dataTable.mapAs(this.candlestickMapping);
      const volumeMapping = this.dataTable.mapAs(this.volumeMapping);

      // create stock chart
      this.chart = anychart.stock();

      // create and setup candlestick series on the first plot
      this.stockPlot = this.chart.plot(0);
      this.stockSeries = this.stockPlot.candlestick(candlestickMapping);
      this.stockSeries.legendItem().iconType('risingfalling');
      this.stockPlot.eventMarkers().position('series');
      this.stockPlot.eventMarkers().seriesId(0);

      // create and setup volume plot
      this.volumePlot = this.chart.plot(1);
      this.volumePlot.height('30%');
      this.volumePlot.yAxis().labels();
      this.volumeSeries = this.volumePlot.column(volumeMapping);
      this.volumeSeries.name('Volume');

      // create scroller series
      this.chart.scroller().area(volumeMapping);

      this.chart.container(this.$refs.chartContainer);
      this.chart.draw();

      this.rangePicker = anychart.ui.rangePicker();
      this.rangePicker.render(this.chart);

      this.rangeSelector = anychart.ui.rangeSelector();
      this.rangeSelector.render(this.chart);
    },
    setData() {
      this.dataTable && this.dataTable.remove();
      this.dataTable.addData(this.data);
      this.setEvents();
    },
    setEvents() {
      if (this.data.length) {
        this.stockPlot.eventMarkers({
          type: 'pin',
          groups: [
            { format: 'A', data: this.eventsA },
            { format: 'B', data: this.eventsB },
          ],
        });
      }
    },
    setTitle() {
      this.chart.title(this.title);
      this.stockSeries.name(this.title);
    },
  },
};
</script>
