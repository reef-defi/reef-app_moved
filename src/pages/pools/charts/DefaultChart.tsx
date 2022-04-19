import React from 'react';
import { scaleTime } from 'd3-scale';
import { ChartCanvas } from 'react-stockcharts';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { CHART_HEIGHT, CHART_MARGIN, DefaultChartType } from './types';
import './Chart.css';

const DefaultChart: React.FC<DefaultChartType> = ({
  ratio, width, data, type, fromDate, toDate, children,
}): JSX.Element => (
  <ChartCanvas
    ratio={ratio}
    width={width}
    height={CHART_HEIGHT}
    margin={CHART_MARGIN}
    type={type}
    pointsPerPxThreshold={1}
    seriesName="MSFT"
    data={data}
    displayXAccessor={(d) => d.date}
    xAccessor={(d) => d.date}
    xScale={scaleTime()}
    xExtents={[fromDate, toDate]}
    mouseMoveEvent
    panEvent={false}
    zoomEvent={false}
    clamp={false}
  >
    {children}
  </ChartCanvas>
);

export default fitWidth(DefaultChart);
