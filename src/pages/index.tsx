import { FC, useCallback, useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';

const Main: FC = () => {
  const [count, setCount] = useState(0);

  const add = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  const subtract = useCallback(() => {
    setCount((count) => count - 1);
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Button onClick={add}>+</Button>
      </div>
      <div>{count}</div>
      <div>
        <Button onClick={subtract}>-</Button>
      </div>
    </div>
  );
};

export default Main;
