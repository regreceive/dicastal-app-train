import { FC, useCallback, useState } from 'react';
import BoxArea from '@/pages/BoxArea';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import * as api from '@/services';
import { Button, Table } from 'antd';

const columns: ColumnsType<any> = [
  {
    title: '轮型',
    dataIndex: 'product',
  },
  {
    title: '模具',
    dataIndex: 'tool',
  },
  {
    title: '质检',
    dataIndex: 'quality',
  },
  {
    title: '质检时间',
    dataIndex: 'time',
    render: (value) => {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
];

const Main: FC = () => {
  const [data, setData] = useState([]);

  const getSummary = useCallback(async () => {
    const res = await api.getSummary('1');
    setData(res.data);
  }, []);

  return (
    <div>
      <BoxArea
        title="标题1"
        rightArea={<Button onClick={getSummary}>刷新</Button>}
      >
        <Table columns={columns} dataSource={data} rowKey="id" />
      </BoxArea>
    </div>
  );
};

export default Main;
