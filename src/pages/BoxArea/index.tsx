import { FC, ReactNode } from 'react';
import Title from '@/pages/BoxArea/components/Title';
import styles from './style.less';

interface Props {
  title: string;
  rightArea?: ReactNode;
}

const BoxArea: FC<Props> = (props) => {
  return (
    <div className={styles.boxArea}>
      <Title text={props.title}>{props.rightArea}</Title>
      <div>{props.children}</div>
    </div>
  );
};

export default BoxArea;
