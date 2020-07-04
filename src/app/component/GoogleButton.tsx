import React, { ReactElement } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { PropTypes, Button } from '@material-ui/core';

import { Consumer, Runnable } from '../models/types/Functions';
import GoogleIcon from './CustomIcons';
import EnvVariables from '../utils/EnvVariables';

type props = {
  onSuccess: Consumer<GoogleLoginResponse | GoogleLoginResponseOffline>,
  onFailure: Consumer<any>,
  onClick: Runnable,
  buttonText: string,
  fullWidth: boolean;
  variant: 'text' | 'outlined' | 'contained';
  color: PropTypes.Color;
}

export default function GoogleButton(props: props): ReactElement {
  const {
    onSuccess,
    onFailure,
    onClick,
    buttonText,
    fullWidth,
    variant,
    color,
  } = props;

  console.log('GB: ', EnvVariables.GOOGLE_CLIENT_ID);
  function renderButton(renderProps: { onClick: Runnable }): ReactElement {
    return (
      <Button fullWidth={fullWidth}
              variant={variant}
              color={color}
              onClick={ () => {
                onClick();
                renderProps.onClick();
              } }
              startIcon={ <GoogleIcon/> }
      >
        { buttonText }
      </Button>
    );
  }

  return (
    <GoogleLogin
      clientId={ EnvVariables.GOOGLE_CLIENT_ID }
      onSuccess={ onSuccess }
      onFailure={ onFailure }
      render={ renderButton }
    />
  );
}

GoogleButton.defaultProps = {
  fullWidth: true,
  variant: 'outlined',
  color: 'primary',
}
