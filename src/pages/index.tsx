import { FC } from 'react';

import BoxArea from '@/pages/BoxArea';
import DateRange from '@/pages/BoxArea/components/DateRange';

const Main: FC = () => {
  return (
    <div>
      <BoxArea title="标题1" rightArea={<DateRange onChange={() => {}} />}>
        内容
      </BoxArea>
    </div>
  );
};

export default Main;
