import Vue from 'vue';

import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons';
import { MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { GridPlugin } from '@syncfusion/ej2-vue-grids';
import { ChartPlugin, RangeNavigatorPlugin, StockChartPlugin } from '@syncfusion/ej2-vue-charts';

require('@syncfusion/ej2-base/styles/material.css');
require('@syncfusion/ej2-buttons/styles/material.css');
require('@syncfusion/ej2-calendars/styles/material.css');
require('@syncfusion/ej2-dropdowns/styles/material.css');
require('@syncfusion/ej2-inputs/styles/material.css');
require('@syncfusion/ej2-navigations/styles/material.css');
require('@syncfusion/ej2-popups/styles/material.css');
require('@syncfusion/ej2-splitbuttons/styles/material.css');
require('@syncfusion/ej2-grids/styles/material.css');
require('@syncfusion/ej2-vue-grids/styles/material.css');


Vue.use(ButtonPlugin);
Vue.use(MultiSelectPlugin);
Vue.use(GridPlugin);
Vue.use(ChartPlugin);
Vue.use(RangeNavigatorPlugin);
Vue.use(StockChartPlugin);
