import { FC } from 'react';
import { Table } from 'antd';

const data = [
  {
    name: 'John Brown',
    age: 32,
  },
  {
    name: 'Jim Green',
    age: 42,
  },
  {
    name: 'Joe Black',
    address: 'Sidney No. 1 Lake Park',
  },
];

const Main: FC = () => {
  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
  ];
  return (
    <div>
      <Table columns={column} dataSource={data} rowKey="name" />
    </div>
  );
};

export default Main;
