<template>
  <div>
    <ejs-stockchart
      style="display: block"
      id="chart2"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :chartArea="chartArea"
      :tooltip="tooltip"
      :crosshair="crosshair"
      :tooltipRender="tooltipRender"
      :title="title"
      :border="border"
      :enablePeroiSelector="enablePeroiSelector"
      :theme="theme"
    >
      <e-stockchart-series-collection>
        <e-stockchart-series
          :dataSource="chartData && chartData.time_series"
          type="Candle"
          volume="volume"
          xName="date"
          low="low"
          high="high"
          open="open"
          close="close"
        ></e-stockchart-series>
        <e-stockchart-series
          :dataSource="chartData && chartData.time_series2"
          type="Candle"
          volume="volume"
          xName="date"
          low="low"
          high="high"
          open="open"
          close="close"
        ></e-stockchart-series>
      </e-stockchart-series-collection>
    </ejs-stockchart>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  DateTime,
  CandleSeries,
  Tooltip,
  Crosshair,
  RangeTooltip,
  LineSeries,
  SplineSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  Export,
} from '@syncfusion/ej2-vue-charts';
export default {
  name: 'chart2',
  data() {
    return {
      theme: 'Material',
      //Initializing Primary X Axis
      primaryXAxis: {
        valueType: 'DateTime',
        majorGridLines: { color: 'transparent' },
        crosshairTooltip: { enable: true },
      },

      //Initializing Primary Y Axis
      primaryYAxis: {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', width: 0 },
      },
      crosshair: {
        enable: true,
      },
      title: 'AAPL Stock Price',
      chartArea: {
        border: {
          width: 0,
        },
      },
      border: { width: 0 },
      enablePeroiSelector: true,
      tooltip: { enable: true },
    };
  },
  computed: {
    ...mapState({
      chartData: (state) =>
        state.chartData && {
          ...state.chartData,
          time_series: state.chartData.time_series.map((e) => ({
            ...e,
            date: new Date(e.date),
          })),
          time_series2: state.chartData.time_series.map((e) => ({
            ...e,
            adjusted_close: e.adjusted_close * Math.random(),
            close: e.close * Math.random(),
            high: e.high * Math.random(),
            low: e.low * Math.random(),
            open: e.open * Math.random(),
            volume: undefined,
            isMessageCount: true,
            // dividend_amount: 0,
            // split_coefficient: 1,
          })),
          time_series3: state.chartData.time_series.map((e) => {
            const m1 = Math.random() * 15;
            const m2 = Math.random() * 10;
            const m3 = Math.random() * 25;
            return {
              ...e,
              messages1_count: m1,
              messages2_count: m2,
              messages3_count: m3,
              messages_total_count: m1 + m2 + m3,
            };
          }),
        },
    }),
  },
  methods: {
    tooltipRender(args) {
      if (args.text.split('<br/>')[4]) {
        let target = parseInt(
          args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]
        );
        let value = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(
          args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0],
          value
        );
      }
    },
  },
  provide: {
    stockChart: [
      DateTime,
      Tooltip,
      Crosshair,
      RangeTooltip,
      LineSeries,
      SplineSeries,
      CandleSeries,
      HiloOpenCloseSeries,
      HiloSeries,
      RangeAreaSeries,
      Trendlines,
      EmaIndicator,
      RsiIndicator,
      BollingerBands,
      TmaIndicator,
      MomentumIndicator,
      SmaIndicator,
      AtrIndicator,
      AccumulationDistributionIndicator,
      MacdIndicator,
      StochasticIndicator,
      Export,
    ],
  },
};
</script>
