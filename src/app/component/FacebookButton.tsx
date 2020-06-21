import React, { ReactElement } from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


import EnvVariables from '../utils/EnvVariables';
import { Consumer, Runnable } from '../models/types/Functions';
import { Button, PropTypes } from '@material-ui/core';

interface FacebookButtonProps {
  onClick: Runnable
  callBack: Consumer<ReactFacebookLoginInfo | ReactFacebookFailureResponse>,
  buttonText: string,
  fullWidth: boolean;
  variant: 'text' | 'outlined' | 'contained';
  color: PropTypes.Color;
}

export default function FacebookButton(props: FacebookButtonProps): ReactElement<FacebookButtonProps> {
  const {
    onClick,
    callBack,
    buttonText,
    fullWidth,
    variant,
    color
  } = props;
  function renderButton(rp: any): ReactElement {
    return (
      <Button variant={variant}
              color={color}
              fullWidth={fullWidth}
              onClick={() => {
                onClick();
                rp.onClick()
              }}
              startIcon={<FacebookIcon />}>
        {buttonText}
      </Button>
    );
  }

  return (
    <FacebookLogin appId={EnvVariables.FACEBOOK_APP_ID}
                   callback={callBack}
                   fields='name, email'
                   render={renderButton}
    />
  );
}

FacebookButton.defaultProps = {
  buttonText: 'Entrar com Facebook',
  variant: 'outlined',
  color: 'primary',
  fullWidth: true
}
