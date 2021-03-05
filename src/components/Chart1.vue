<template>
  <div>
    <ejs-chart
      ref="chart"
      :chartArea="chartArea"
      id="chart1"
      align="center"
      style="display: block"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :tooltip="tooltip"
      :crosshair="crosshair"
      :axes="axes"
      :rows="rows"
      :legendSettings="legendSettings"
      :axisLabelRender="axisLabelRender"
      :theme="theme"
      :tooltipRender="tooltipRender"
      :pointRender="pointRender"
      :zoomSettings="zoomSettings"
    >
      <e-series-collection>
        <e-series
          :dataSource="chartData && chartData.time_series"
          type="Candle"
          xName="date"
          yAxisName="secondary"
          :marker="marker"
          high="high"
          low="low"
          open="open"
          close="close"
          volume="volume"
          name="Apple Inc"
          bearFillColor="#2ecd71"
          bullFillColor="#e74c3d"
        />
        <e-series
          :dataSource="chartData && chartData.time_series"
          type="Column"
          xName="date"
          yName="volume"
          :marker="marker"
          name="Volume"
        />
      </e-series-collection>
    </ejs-chart>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  CandleSeries,
  StripLine,
  Category,
  Tooltip,
  DateTime,
  Zoom,
  ColumnSeries,
  Logarithmic,
  Crosshair,
} from '@syncfusion/ej2-vue-charts';

export default {
  name: 'chart1',
  data() {
    return {
      pointColors: [],
      theme: 'Material',
      //Initializing Primary X Axis
      primaryXAxis: {
        valueType: 'DateTime',
        crosshairTooltip: { enable: true },
        majorGridLines: { width: 0 },
      },
      //Initializing Primary Y Axis
      primaryYAxis: {
        title: 'Volume',
        valueType: 'Logarithmic',
        opposedPosition: true,
        majorGridLines: { width: 1 },
        lineStyle: { width: 0 },
        rangePadding: 'None',
        stripLines: [
          {
            end: 1300000000,
            startFromAxis: true,
            text: '',
            color: 'black',
            visible: true,
            opacity: 0.03,
            zIndex: 'Behind',
          },
        ],
      },
      rows: [
        {
          height: '30%',
        },
        {
          height: '70%',
        },
      ],
      axes: [
        {
          name: 'secondary',
          opposedPosition: true,
          rowIndex: 1,
          majorGridLines: { width: 1 },
          labelFormat: 'n0',
          title: 'Price',
          plotOffset: 30,
          lineStyle: { width: 0 },
          rangePadding: 'None',
        },
      ],
      tooltip: {
        enable: true,
        shared: true,
      },
      crosshair: {
        enable: true,
        // lineType: 'Vertical',
      },
      chartArea: {
        border: { width: 0 },
      },
      marker: {
        visible: false,
      },
      legendSettings: {
        visible: false,
      },
      zoomSettings: {
        mode: 'X',
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableSelectionZooming: true,
        enableScrollbar: true,
      },
    };
  },
  computed: {
    ...mapState({
      chartData: (state) =>
        state.chartData && {
          ...state.chartData,
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
    axisLabelRender: function (args) {
      if (args.axis.name === 'primaryYAxis') {
        args.text = this.getLabelText(args.text);
      }
      if (args.axis.name === 'secondary') {
        args.text = '$' + args.text;
      }
    },
    pointRender: function (args) {
      if (args.series.type === 'Candle') {
        this.pointColors.push(args.fill);
      } else {
        args.fill = this.pointColors[args.point.index];
      }
    },
    tooltipRender: function (args) {
      if (!args.series.index) {
        this.text =
          'Volume : <b>' +
          this.getLabelText(args.text.split('<b>')[1].split('</b>')[0]) +
          '</b>';
      }
    },
    getLabelText: function (value) {
      return (value / 1000000000).toFixed(1) + 'bn';
    },
  },
  provide: {
    rangeNavigator: [DateTime],
    chart: [
      CandleSeries,
      StripLine,
      Category,
      Tooltip,
      DateTime,
      Zoom,
      ColumnSeries,
      Logarithmic,
      Crosshair,
    ],
  },
};
</script>
