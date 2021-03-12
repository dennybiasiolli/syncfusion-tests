<template>
  <div>
    <ejs-stockchart
      style="display: block"
      id="chart3"
      title="Chart3"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :chartArea="chartArea"
      :tooltip="tooltip"
      :crosshair="crosshair"
      :tooltipRender="tooltipRender"
      :border="border"
      :enablePeroiSelector="enablePeroiSelector"
      :theme="theme"
      :zoomSettings="zoomSettings"
      :axes="axes"
      :rows="rows"
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
        <!-- <e-series
          type="StackingColumn"
          width="2"
          x-name="date"
          y-name="messages1_count"
          name="Messages"
          :data-source="chartData && chartData.time_series2"
          tooltipFormat="BBG msg: <b>${point.y}</b>"
        /> -->
        <!-- <e-series
          type="StackingColumn"
          width="2"
          x-name="date"
          y-name="messages2_count"
          name="Messages"
          :data-source="chartData && chartData.time_series2"
          tooltipFormat="Slack msg: <b>${point.y}</b>"
        />
        <e-series
          type="StackingColumn"
          width="2"
          x-name="date"
          y-name="messages3_count"
          name="Messages"
          :data-source="chartData && chartData.time_series2"
          tooltipFormat="Email msg: <b>${point.y}</b>"
        /> -->
        <!-- <e-series
          type="Line"
          width="2"
          x-name="date"
          y-name="messages_total_count"
          name="Messages"
          :data-source="chartData && chartData.time_series2"
          tooltipFormat="Total messages: <b>${point.y}</b>"
        /> -->
        <e-series
          :dataSource="chartData && chartData.time_series2"
          type="StackingColumn"
          xName="date"
          yName="messages1_count"
          yAxisName="messagesAxis"
          name="BBG Msg"
        />
        <e-series
          :dataSource="chartData && chartData.time_series2"
          type="StackingColumn"
          xName="date"
          yName="messages2_count"
          yAxisName="messagesAxis"
          name="Emails"
        />
        <e-series
          :dataSource="chartData && chartData.time_series2"
          type="StackingColumn"
          xName="date"
          yName="messages3_count"
          yAxisName="messagesAxis"
          name="Slack Msg"
        />
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
  ColumnSeries,
  Zoom,
  StackingColumnSeries,
} from '@syncfusion/ej2-vue-charts';
export default {
  name: 'chart3',
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
      rows: [
        {
          height: '70%',
        },
        {
          height: '30%',
        },
      ],
      axes: [
        {
          name: 'stockAxis',
          lineStyle: { color: 'transparent' },
          majorTickLines: { color: 'transparent', width: 0 },
        },
        {
          name: 'messagesAxis',
          opposedPosition: true,
          rowIndex: 1,
          // majorGridLines: { width: 1 },
          labelFormat: 'n0',
          title: 'Messages',
          // plotOffset: 30,
          lineStyle: { width: 0 },
          rangePadding: 'None',
        },
      ],
      crosshair: {
        enable: true,
      },
      chartArea: {
        border: {
          width: 0,
        },
      },
      border: { width: 0 },
      enablePeroiSelector: true,
      tooltip: {
        enable: true,
        shared: true,
      },
      zoomSettings: {
        enableSelectionZooming: true,
        mode: 'X',
      }
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
          time_series2: state.chartData.time_series.map((e) => {
            const m1 = Math.floor(Math.random() * 15);
            const m2 = Math.floor(Math.random() * 10);
            const m3 = Math.floor(Math.random() * 25);
            return {
              date: e.date,
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
    getLabelText(value) {
      return (value / 1000000000).toFixed(1) + 'bn';
    },
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
      ColumnSeries,
      Zoom,
      StackingColumnSeries,
    ],
  },
};
</script>
