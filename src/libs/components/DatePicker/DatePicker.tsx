import { DatePickerProps } from 'antd/lib/date-picker';
import { FC, useState } from 'react';
import { ContainerDatePicker, DateMessageStyled, Label, StyledDatePicker } from './style';
import './style.scss';
import { Controller, useFormContext } from 'react-hook-form';

interface IDatePicker {
  label?: string;
  message?: string;
  required?: boolean;
}

const DatePicker: FC<IDatePicker & DatePickerProps> = ({ label, message, ...props }) => {
  const {
    control,
    register,
    getValues,
    formState: { errors }
  } = useFormContext();

  const errorMessage: any = message || (errors && props.name ? errors[props.name]?.message : '');

  return (
    <div className="div">
      {label && (
        <Label>
          {label}
          {props.required ? <span className="required-mark">*</span> : null}
        </Label>
      )}
      <ContainerDatePicker>
        <Controller
          name={`${props.name}`}
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <StyledDatePicker
              isLabel={Boolean(label)}
              {...register(`${props.name}`)}
              value={getValues(`${props.name}`)}
              error={errorMessage}
              showToday={false}
              dropdownClassName="style-range-picker-popover"
              onChange={(dates) => {
                onChange(dates);
                props.onChange;
              }}
              {...field}
              {...props}
            />
          )}
        />
        {errorMessage && <DateMessageStyled>{errorMessage}</DateMessageStyled>}
      </ContainerDatePicker>
    </div>
  );
};

export default DatePicker;

DatePicker.defaultProps = {
  format: 'DD.MM.YYYY'
};
