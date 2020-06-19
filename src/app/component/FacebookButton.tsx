import React, { ReactElement } from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


import EnvVariables from '../utils/EnvVariables';
import { Consumer, Runnable } from '../models/types/Functions';
import { Button } from '@material-ui/core';

interface FacebookButtonProps {
  onClick: Runnable
  callBack: Consumer<ReactFacebookLoginInfo | ReactFacebookFailureResponse>
}

export default function FacebookButton({ callBack, onClick }: FacebookButtonProps): ReactElement<FacebookButtonProps> {
  function renderButton(rp: any): ReactElement {
    return (
      <Button variant='outlined'
              color='primary'
              fullWidth
              onClick={() => {
                onClick();
                rp.onClick()
              }}
              startIcon={<FacebookIcon />}>
        Entrar com Facebook
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
