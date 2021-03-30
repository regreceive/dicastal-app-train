import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, DatePicker } from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import moment, { Moment } from 'moment';
import { usePrevious } from 'ahooks';

interface Props {
  /**
   * 时间范围限制天数，默认不限制
   */
  limitDays?: number;
  /**
   * 显示最近几天
   */
  lastDays?: number;
  /** 是否展示时间，默认展示 */
  withTime?: boolean;

  onChange: (range: any[]) => void;
}

const DateRange: React.FC<Props> = (props) => {
  const [range, setRange] = useState<RangeValue<Moment>>([null, null]);
  const [hackRange, setHackRange] = useState<RangeValue<Moment>>();
  const previous = usePrevious(range);
  const rangeRef = useRef<any>(null);

  // 默认今天
  useEffect(() => {
    if (props.lastDays) {
      setLastDays(props.lastDays);
    } else {
      setLastDayDuty();
    }
  }, []);

  useEffect(() => {
    if (range) {
      if (range[0] && range[1]) {
        if (range[0].isSame(previous?.[0]) && range[1].isSame(previous?.[1])) {
          return;
        }
      }
      props.onChange(range);
    }
  }, [range]);

  // 响应时间范围组件
  const handleChange = useCallback(
    (range: RangeValue<Moment>) => {
      if (range && range[0] && range[1]) {
        if (!props.withTime) {
          range[0].startOf('day');
          range[1].endOf('day');
        }
        setRange(range);
      } else {
        setRange([null, null]);
      }
    },
    [range, props.withTime],
  );

  // 为了限制7日内范围
  const handleCalendarChange = useCallback(
    (range: RangeValue<Moment>) => {
      if (!props.limitDays) {
        return;
      }
      setHackRange(range);
    },
    [props.limitDays],
  );

  // 为了限制7日内范围
  const handleOpenChange = useCallback(
    (open) => {
      if (!props.limitDays) {
        return;
      }
      if (open) {
        setHackRange([null, null]);
      } else {
        setHackRange(undefined);
      }
    },
    [props.limitDays],
  );

  // 限制7天范围内
  const disabledDate = useCallback(
    (current: Moment) => {
      if (props.limitDays && hackRange) {
        let tooEarly = false;
        let tooLate = false;
        if (hackRange[0]) {
          tooLate = current.diff(hackRange[0], 'days') > props.limitDays;
        }
        if (hackRange[1]) {
          tooEarly = hackRange[1].diff(current, 'days') > props.limitDays;
        }
        return tooEarly || tooLate;
      }
      return false;
    },
    [hackRange, props.limitDays],
  );

  // 设为最近几天
  const setLastDays = useCallback((days: number) => {
    const today = moment().startOf('day');
    const range: RangeValue<Moment> = [
      today.clone().subtract(days - 1, 'day'),
      today.endOf('day'),
    ];
    rangeRef.current?.blur();
    setRange(range);
  }, []);

  // 设置为昨天白班的时间范围
  const setLastDayDuty = useCallback(() => {
    const range: RangeValue<Moment> = [
      moment().startOf('day').subtract(1, 'd').add(8, 'hour'),
      moment()
        .startOf('day')
        .subtract(1, 'd')
        .add(20, 'hour')
        .subtract(1, 'second'),
    ];
    setRange(range);
    rangeRef.current?.blur();
  }, []);

  // 设置为昨天夜班的时间范围
  const setLastNightDuty = useCallback(() => {
    const range: RangeValue<Moment> = [
      moment().startOf('day').subtract(1, 'd').add(20, 'hour'),
      moment().startOf('day').add(8, 'hour').subtract(1, 'second'),
    ];
    setRange(range);
    rangeRef.current?.blur();
  }, []);

  // 是否是今天，按钮状态需要
  const isDayRange = useMemo(() => {
    if (range && range[0] && range[1]) {
      return (
        moment()
          .startOf('day')
          .subtract(1, 'd')
          .add(8, 'hour')
          .isSame(range[0]) &&
        moment()
          .startOf('day')
          .subtract(1, 'd')
          .add(20, 'hour')
          .subtract(1, 'second')
          .isSame(range[1])
      );
    }
    return false;
  }, [range]);

  // 是否是昨天，按钮状态需要
  const isNightRange = useMemo(() => {
    if (range && range[0] && range[1]) {
      return (
        moment()
          .startOf('day')
          .subtract(1, 'd')
          .add(20, 'hour')
          .isSame(range[0]) &&
        moment()
          .startOf('day')
          .add(8, 'hour')
          .subtract(1, 'second')
          .isSame(range[1])
      );
    }
    return false;
  }, [range]);

  return (
    <DatePicker.RangePicker
      ref={rangeRef}
      value={hackRange || range}
      onChange={handleChange}
      onCalendarChange={handleCalendarChange}
      onOpenChange={handleOpenChange}
      disabledDate={disabledDate}
      showTime={props.withTime}
      renderExtraFooter={() => (
        <>
          <Button type={isDayRange ? 'link' : 'text'} onClick={setLastDayDuty}>
            昨天白班
          </Button>
          <Button
            type={isNightRange ? 'link' : 'text'}
            onClick={setLastNightDuty}
          >
            昨天夜班
          </Button>
        </>
      )}
    />
  );
};

DateRange.defaultProps = {
  withTime: true,
};

export default DateRange;
