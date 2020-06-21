import React, { CSSProperties, ReactElement } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldErrors } from 'react-hook-form';

import { InputInvalid } from './index';
import Assert from '../utils/Assert';
import { makeStyles } from '@material-ui/core/styles';

type propType<T> = TextFieldProps & {
  space: string
  errors: FieldErrors<T>,
  name: string
};

const useStyles = makeStyles({
  label: {
    color: '#9c9a9a',
    '&$focusedLabel': {
      color: '#000000'
    },
  },
  focusedLabel: {},
  erroredLabel: {},
  underline: {
    "&:after": {
      borderBottom: `2px solid #000000`
    }
  },
  error: {}
})

export default function TextFieldWithError<T = any>(props: propType<T>): ReactElement<propType<T>> {
  const { name, errors, space } = props;
  Assert.notBlank(name);
  Assert.notNull(errors);

  const style: CSSProperties = {
    width: '100%',
    marginBottom: space
  };

  const classes = useStyles();

  return (
    <>
      <TextField { ...props }
                 InputLabelProps={{
                   classes: {
                     root: classes.label,
                     focused: classes.focusedLabel,
                     error: classes.erroredLabel
                   },
                 }}
                 InputProps={{
                   classes: {
                     root: classes.underline,
                     error: classes.error
                   }
                 }}
      />
      <InputInvalid errors={ errors } inputName={ name as string }/>
      <div style={style}/>
    </>
  );
}

TextFieldWithError.defaultProps = {
  space: '0px'
};
