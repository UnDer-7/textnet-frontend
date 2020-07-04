import React, { CSSProperties } from 'react';
import { FieldErrors } from 'react-hook-form';

const styles: CSSProperties = {
  color: 'red',
  marginTop: '5px',
};

interface Props<T> {
  errors: FieldErrors<T>;
  inputName: string;
  errMessage?: string
}

export default function InputInvalid<T>({ errors, inputName, errMessage }: Props<T>) {
  // @ts-ignore
  const err = errors[inputName];

  // console.log('ERR: ', err?.message);
  if (err) return <span style={ styles }>{ err.message || errMessage }</span>;
  return null;
}
