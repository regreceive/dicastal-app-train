import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'antd';
import { useClickAway } from 'ahooks';

const Main: FC = () => {
  const [click, setClick] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (click) {
      log('单击了');
    }
  }, [click]);

  const log = useCallback(
    (text: string) => {
      console.log(text);
    },
    [click],
  );

  const msg = useMemo(() => {
    return 'msg: ' + click.toString();
  }, [click]);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <div>
      <Button
        onClick={() => setClick(true)}
        type={click ? 'primary' : 'default'}
      >
        按钮
      </Button>
      <div>{click.toString()}</div>
      <div ref={ref}>{msg}</div>
    </div>
  );
};

export default Main;
