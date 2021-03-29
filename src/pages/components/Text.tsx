import { FC } from 'react';

interface Props {
  value: string;
}

/**
 * 自定义文本框组件
 * @param props
 * @constructor
 */
const Text: FC<Props> = (props) => {
  return <div>{props.value}</div>;
};

export default Text;
