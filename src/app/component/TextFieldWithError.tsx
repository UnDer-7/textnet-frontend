import React, { CSSProperties, ReactElement } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldErrors } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import InputMask from 'react-input-mask';

import { InputInvalid } from './index';
import Assert from '../utils/Assert';
import { makeStyles } from '@material-ui/core/styles';
import EnvVariables from '../utils/EnvVariables';

type propType<T> = TextFieldProps & {
  space: string
  errors: FieldErrors<T>,
  name: string,
  withDefaultGrid: boolean,
  mask?: string,
  alwaysShowMask?: boolean,
  errMessage?: string
};

const useStyles = makeStyles({
  label: {
    color: EnvVariables.PRIMARY_COLOR,
    '&$focusedLabel': {
      color: EnvVariables.PRIMARY_COLOR
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

function MainInput<T = any>(props: propType<T>): ReactElement<propType<T>> {
  const { name, errors, space, errMessage } = props;
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
      <InputInvalid errors={ errors } inputName={ name as string } errMessage={errMessage}/>
      <div style={style}/>
    </>
  )
}

function InputWithMask<T = any>(props: propType<T>): ReactElement<propType<T>> {
  const { mask, alwaysShowMask } = props;

  if (mask) {
    return (
      <InputMask mask={mask} alwaysShowMask={alwaysShowMask}>
        {() => (<MainInput {...props}/>) }
      </InputMask>
    );
  } else {
    return (<MainInput {...props}/>);
  }
}

export default function TextFieldWithError<T = any>(props: propType<T>): ReactElement<propType<T>> {
  const { withDefaultGrid } = props;

  if (withDefaultGrid) {
    return (
      <Grid container sm={ 6 } item>
        <InputWithMask<T> {...props}/>
      </Grid>
    );
  } else {
    return (<InputWithMask<T> {...props}/>);
  }
}

TextFieldWithError.defaultProps = {
  space: '0px',
  withDefaultGrid: true
};
