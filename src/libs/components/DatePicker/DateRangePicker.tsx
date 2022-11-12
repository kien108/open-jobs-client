import { RangePickerProps } from 'antd/lib/date-picker';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ContainerRangePicker, Label, StyledRangePicker } from './style';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { MinimizeIcon } from '../Icons';

interface IRangePicker {
  label?: string;
  onChangeHookForm?: ChangeEvent<HTMLInputElement>;
}

const DateRangePicker: FC<IRangePicker & RangePickerProps> = ({ label, onChange, ...props }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<any>(props.defaultValue || props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const { t } = useTranslation();
  return (
    <ContainerRangePicker>
      <StyledRangePicker
        isFocus={value || isFocus}
        placeholder={
          isFocus
            ? props.placeholder
              ? props.placeholder
              : [props.format?.toString().toLowerCase()!, props.format?.toString().toLowerCase()!]
            : ['', '']
        }
        dropdownClassName="style-range-picker-popover"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        separator={<MinimizeIcon width={16} height={16} />}
        onChange={(dates: any, dateStrings: any) => {
          setValue(dates);
          // props.onChange;
          onChange?.(dates, dateStrings);
        }}
        {...props}
      />
      <Label isFocus={value || isFocus}>{label ? label : t('dateRange')}</Label>
    </ContainerRangePicker>
  );
};

export default DateRangePicker;

DateRangePicker.defaultProps = {
  format: 'DD.MM.YYYY'
};
