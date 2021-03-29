import { FC } from 'react';
import styles from './FlexLayout.less';

const FlexLayout: FC = (props) => {
  return (
    <div className={styles.flex}>
      <div>
        <div>top</div>
        <div>
          <div>3</div>
          <div>5</div>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default FlexLayout;
