import { FC, useCallback, useEffect, useState } from 'react';

function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 2000);
  });
}

const Main: FC = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   sleep().then((result: number) => {
  //     setCount(result);
  //   });
  //   console.log("1222222");
  // }, []);

  const run = useCallback(async () => {
    const count = (await sleep()) as number;
    setCount(count);
    console.log(1111111111111);
  }, []);

  useEffect(() => {
    run();
  }, []);

  return <div>{count}</div>;
};

export default Main;
