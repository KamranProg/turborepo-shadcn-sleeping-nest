import React, { useEffect } from "react";
import * as echarts from "echarts";
import { dateTimeFormat } from "../../../../utils/dateTimeHelpers";
import { Sleep } from "../../../../types";

interface SleepOverviewChartProps {
  items: Sleep[];
  heightPx?: string;
}

const SleepOverviewChart: React.FC<SleepOverviewChartProps> = ({
  items,
  heightPx = "400",
}) => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById("chart")!);

    const dataX: string[] = items.map((item) =>
      dateTimeFormat(item?.createdAt?.toString())
    );
    const dataY: number[] = items.map((item) => item?.sleepDuration);

    const option: echarts.EChartsOption = {
      xAxis: {
        type: "category",
        data: dataX,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: dataY,
          type: "bar",
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [items]);

  return (
    <div id="chart" style={{ width: "100%", height: `${heightPx}px` }}></div>
  );
};

export default SleepOverviewChart;
