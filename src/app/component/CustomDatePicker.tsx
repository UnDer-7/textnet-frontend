import React from 'react';

import { DatePicker } from '@material-ui/pickers';
import { Controller, FieldErrors } from 'react-hook-form';
import { DatePickerProps } from '@material-ui/pickers/DatePicker/DatePicker';

import { DefaultGrid, InputInvalid } from './index';
import Validations from '../utils/Validations';

type CustomDatePickerProps<T> = {
  control: any,
  name: string,
  errors?: FieldErrors<T>;
  errorMessage?: string,
  withDefaultGrid: boolean
} & DatePickerProps

function MainPicker<T>(props: CustomDatePickerProps<T>) {
  const {
    control,
    name,
    value,
    onChange,
    errors,
    errorMessage,
  } = props;

  return (
    <>
      <Controller as={ DatePicker }
                  control={ control }
                  name={ name }
                  value={ value }
                  // @ts-ignore
                  onChange={onChange}
                  rules={Validations.DATE}
                  {...props}
      />
      {
        errors && (
          <InputInvalid errors={errors} inputName={ name } errMessage={errorMessage || 'Data invalida'}/>
        )
      }
    </>
  );
}

export default function CustomDatePicker<T = {}>(props: CustomDatePickerProps<T>) {
  const { withDefaultGrid } = props;

  if (withDefaultGrid) {
    return (
      <DefaultGrid>
        <MainPicker<T> { ...props } />
      </DefaultGrid>
    );
  } else {
    return (<MainPicker<T> { ...props } />);
  }
}

CustomDatePicker.defaultProps = {
  withDefaultGrid: true,
  disableFuture: true,
  animateYearScrolling: true,
  clearable: true,
  fullWidth: true,
  cancelLabel: 'Cancelar',
  clearLabel: 'Limpar',
  invalidDateMessage: 'Data inválida',
  inputVariant: 'filled',
  openTo: 'year',
  format: 'dd/MM/yyyy',
  label: 'Data de nascimento',
  views: ['year', 'month', 'date'],
  value: null,
  onChange: ([value]: any[]) => {
    return value;
  }
};
