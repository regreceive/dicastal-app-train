import { FC } from 'react';
import styles from './HolyGrailLayout.less';

const HolyGrailLayout: FC = (props) => {
  return (
    <div className={styles.grid}>
      <div className={styles.main}></div>
      <div className={styles.header} />
      <div className={styles.sidebar} />
      <div className={styles.footer} />
    </div>
  );
};

export default HolyGrailLayout;
