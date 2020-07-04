import React, { ReactElement, useState } from 'react';

import { Slide, Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import { Consumer } from '../../models/types/Functions';
import { SnackbarOrigin } from '@material-ui/core/Snackbar/Snackbar';

export interface ToastProps {
  message: string,
  show: boolean,
  duration?: number,
  type?: Color,
  position?: SnackbarOrigin
}

export interface WithToastProps {
  setToastProp: Consumer<ToastProps>,
}

const initialState: ToastProps = {
  message: 'Default Msg',
  show: false,
};

export default function withToast<T extends object>(Component: React.ComponentType<T>) {
  function WithToast(props: any): ReactElement {
    const [ toastProps, setToastProp ] = useState<ToastProps>(initialState);
    const duration = toastProps.duration || 5000;
    const type = toastProps.type || 'success';
    const position = toastProps.position || {
      horizontal: 'center',
      vertical: 'top'
    };

    const {
      show,
      message,
    } = toastProps;

    return (
      <>
        <Snackbar anchorOrigin={position}
                  open={show}
                  autoHideDuration={duration}
                  onClose={() => {
                    setToastProp({
                      ...toastProps,
                      show: false,
                    })
                  }}
                  TransitionComponent={Slide}
        >
          <Alert severity={type} variant='filled' elevation={8}>{ message }</Alert>
        </Snackbar>
        <Component {...props} setToastProp={setToastProp}/>
      </>
    )
  }

  return WithToast;
}
