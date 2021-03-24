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
          time_series: state.chartData.time_series.map((e) => [
            new Date(e.date),
            e.open,
            e.high,
            e.low,
            e.close,
            e.volume,
          ]),
          time_series2: state.chartData.time_series.map((e) => {
            const m1 = Math.floor(Math.random() * 15);
            const m2 = Math.floor(Math.random() * 10);
            const m3 = Math.floor(Math.random() * 25);
            return {
              date: new Date(e.date),
              messages1_count: m1,
              messages2_count: m2,
              messages3_count: m3,
              messages_total_count: m1 + m2 + m3,
            };
          }),
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
    this.renderChart();
  },
  methods: {
    renderChart() {
      // create data table on loaded data
      var dataTable = anychart.data.table();
      dataTable.addData(this.chartData.time_series);

      // map data for the ohlc series
      var ohlcMapping = dataTable.mapAs({ open: 1, high: 2, low: 3, close: 4 });

      // map data for scroller and volume series
      var valueMapping = dataTable.mapAs({ value: 5 });

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
        .labels()
        .format('${%Value}{scale:(1000000)(1000)|(kk)(k)}');

      // create and setup ohlc series on the first plot
      var volumeSeries = volumePlot.column(valueMapping);
      volumeSeries.name('Volume');

      // create and setup messages plot
      var messagesPlot = chart.plot(2);
      messagesPlot.height('30%');
      messagesPlot
        .yAxis()
        .labels()
        .format('${%Value}{scale:(1000000)(1000)|(kk)(k)}');
      // create and setup ohlc series on the first plot
      var messageSeries2 = messagesPlot.column(valueMapping);
      messageSeries2.name('Messages');

      stockPlot.eventMarkers({
        type: 'pin',
        groups: [
          {
            format: 'A',
            title: 'Alan',
            data: [
              {
                date: '2020-09-14',
                description:
                  'Cisco announced the acquisition of Audium Corporation.',
              },
              {
                date: '2020-10-14',
                description:
                  'Cisco announced its intent to acquire PostPath, Inc.',
              },
            ],
          },
          {
            format: 'B',
            title: 'Brad',
            data: [
              {
                date: '2020-08-14',
                description:
                  'Cisco announced the acquisition of Audium Corporation.',
                title: 'var',
                foo: 'bar',
              },
              {
                date: '2020-10-17',
                description:
                  'Cisco announced its intent to acquire PostPath, Inc.',
              },
            ],
          },
        ],
      });

      // create scroller series
      chart.scroller().area(valueMapping);

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
