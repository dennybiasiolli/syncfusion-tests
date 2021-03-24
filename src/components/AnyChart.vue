<template>
  <div ref="chartContainer" :style="{ width: width, height: height }" />
</template>

<script>
import anychart from 'anychart';
import { mapState } from 'vuex';

export default {
  name: 'any-chart',
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: [Array, Object],
      required: true,
    },
    title: {
      type: String,
    },
    width: String,
    height: String,
  },
  computed: {
    ...mapState({
      chartData: (state) =>
        state.chartData && {
          ...state.chartData,
          values: state.chartData.time_series.map((e) => ({
            date: new Date(e.date),
            open: e.open,
            high: e.high,
            low: e.low,
            close: e.close,
            volume: e.volume,
          })),
        },
    }),
  },
  watch: {
    chartData() {
      this.renderChart();
    },
  },
  mounted() {
    // this.renderChart();
  },
  updated() {
    // this.renderChart();
  },
  methods: {
    renderChart() {
      var dataTable = anychart.data.table('date');
      dataTable.addData(this.chartData.values);

      var ohlcMapping = dataTable.mapAs({
        x: 'date',
        open: 'open',
        high: 'high',
        low: 'low',
        close: 'close',
      });
      var volumeMapping = dataTable.mapAs({ x: 'date', value: 'volume' });

      // create stock chart
      var chart = anychart.stock();

      // create and setup ohlc series on the first plot
      var stockPlot = chart.plot(0);
      var ohlcSeries = stockPlot.ohlc(ohlcMapping);
      ohlcSeries.name(this.chartData.symbol);
      ohlcSeries.legendItem().iconType('risingfalling');

      // create and setup volume plot
      var volumePlot = chart.plot(1);
      volumePlot.height('30%');
      volumePlot
        .yAxis()
        .labels();
      var volumeSeries = volumePlot.column(volumeMapping);
      volumeSeries.name('Volume');

      stockPlot.eventMarkers({
        type: 'pin',
        groups: [
          {
            format: 'A',
            data: [
              {
                date: '2020-09-14',
                title: 'Alan',
                description:
                  'Cisco announced the acquisition of Audium Corporation.',
              },
              {
                date: '2020-10-14',
                title: 'Alan',
                description:
                  'Cisco announced its intent to acquire PostPath, Inc.',
              },
            ],
          },
          {
            format: 'B',
            data: [
              {
                date: '2020-08-14',
                title: 'Brad',
                description:
                  'Cisco announced the acquisition of Audium Corporation.',
              },
              {
                date: '2020-10-17',
                title: 'Brad',
                description:
                  'Cisco announced its intent to acquire PostPath, Inc.',
              },
            ],
          },
        ],
      });

      // create scroller series
      chart.scroller().area(volumeMapping);

      // set container id for the chart
      chart.container(this.$refs.chartContainer);

      // initiate chart drawing
      chart.draw();

      // create range picker
      var rangePicker = anychart.ui.rangePicker();
      // init range picker
      rangePicker.render(chart);

      // create range selector
      var rangeSelector = anychart.ui.rangeSelector();
      // init range selector
      rangeSelector.render(chart);

      chart.listen('eventMarkerClick', function (e) {
        console.log(e.eventMarker);
      });
    },
  },
};
</script>
