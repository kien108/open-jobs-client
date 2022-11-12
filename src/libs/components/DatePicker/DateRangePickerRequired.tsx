import { RangePickerProps } from 'antd/lib/date-picker';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ContainerRangePicker, Label, StyledRangePicker, DateMessageStyled } from './style';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { MinimizeIcon } from '../Icons';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';

interface IRangePicker {
  label?: string;
  onChangeHookForm?: ChangeEvent<HTMLInputElement>;
  message?: string;
  parentName?: string;
}

const DateRangePickerRequired: FC<IRangePicker & RangePickerProps> = ({
  label,
  message,
  parentName,
  ...props
}) => {
  const { t } = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<any>(props.defaultValue || props.value);
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  const {
    control,
    register,
    getValues,
    formState: { errors }
  } = useFormContext();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  let errorObject = errors;
  if (parentName) {
    errorObject = {
      ...errors,
      [parentName]: Object.assign({}, errors[parentName])
    };
  }

  const errorMessage: any =
    message || (errors && props.name ? get(errorObject, `${props.name}.message`, undefined) : '');

  useEffect(() => {
    setIsPlaceholder(getValues(`${props.name}`)?.length > 0 || isFocus);
  }, [getValues(`${props.name}`), isFocus]);

  return (
    <>
      <ContainerRangePicker>
        <Controller
          name={`${props.name}`}
          control={control}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <StyledRangePicker
                isLabel={Boolean(label)}
                {...register(`${props.name}`)}
                value={getValues(`${props.name}`)}
                error={errorMessage}
                isFocus={isPlaceholder}
                placeholder={
                  isFocus
                    ? props.placeholder
                      ? props.placeholder
                      : [
                          props.format?.toString().toLowerCase()!,
                          props.format?.toString().toLowerCase()!
                        ]
                    : ['', '']
                }
                dropdownClassName="style-range-picker-popover"
                onFocus={() => setIsFocus(true)}
                separator={<MinimizeIcon width={16} height={16} />}
                onChange={(dates: any, dateStrings: any) => {
                  setValue(dates);
                  onChange?.(dates, dateStrings);
                  props.onChange;
                }}
                {...field}
                onBlur={() => setIsFocus(false)}
                {...props}
              />
            );
          }}
        />

        <Label isFocus={isPlaceholder}>{label ? label : t('dateRange')}</Label>
      </ContainerRangePicker>
      {errorMessage && <DateMessageStyled>{errorMessage}</DateMessageStyled>}
    </>
  );
};

export default DateRangePickerRequired;

DateRangePickerRequired.defaultProps = {
  format: 'DD.MM.YYYY'
};
