import { FC, useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';

const Main: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <div>
        <Button onClick={() => setCount((value) => value + 1)}>+</Button>
      </div>
      <div>{count}</div>
      <div>
        <Button onClick={() => setCount((value) => value - 1)}>-</Button>
      </div>
    </div>
  );
};

export default Main;
