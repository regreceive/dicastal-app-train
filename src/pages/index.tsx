import { FC, useCallback, useEffect, useState } from 'react';
import BoxArea from '@/pages/BoxArea';
import * as api from '@/services';
import { Button } from 'antd';
import useChart from '@/sdk/useChart';

const Main: FC = () => {
  const [chartData, setChartData] = useState([]);
  const { ref, setOption, showEmpty } = useChart();

  // 请求时序数据
  const getTS = useCallback(async () => {
    const res = await api.getTS();
    setChartData(res.data);
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      setOption({
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: chartData,
            encode: {
              x: 0,
              y: [1],
            },
          },
          {
            type: 'line',
            data: chartData,
            encode: {
              x: 0,
              y: [2],
            },
          },
        ],
      });
    } else {
      showEmpty();
    }
  }, [chartData]);

  return (
    <div>
      <BoxArea title="标题1" rightArea={<Button onClick={getTS}>刷新</Button>}>
        <div ref={ref} />
      </BoxArea>
    </div>
  );
};

export default Main;
