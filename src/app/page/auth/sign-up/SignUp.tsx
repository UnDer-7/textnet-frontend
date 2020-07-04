import React, { ReactElement } from 'react';

import { Button, Grid } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';

import { BackgroundTextNet, CreateGrid, Divider, FacebookButton, GoogleButton, WhiteSpace } from '../../../component';
import { withBlockUI, WithBlockUIProps, withToast, WithToastProps } from '../../../component/HOC';
import { SIGN_UP_PATH_EMAIL, SIGN_UP_PATH_FORM } from '../AuthRoutes';
import UserService from '../../../service/UserService';
import UserType from '../../../models/UserType';
import UserStore from '../../../store/UserStore';
import User from '../../../models/User';

function SignUp({ setToastProp, setIsBlockingUI }: WithToastProps<WithBlockUIProps>): ReactElement {
  const history = useHistory();

  function signUpWithEmail(): void {
    history.push(SIGN_UP_PATH_EMAIL)
  }

  function onComplete() {
    setIsBlockingUI(false);
  }

  function onSuccess(canCreate: boolean, data: User): void {
    if (canCreate) {
      UserStore.send(data);
      history.push(SIGN_UP_PATH_FORM);
    } else {
      setToastProp({
        show: true,
        message: 'E-mail já cadastrado',
        type: 'error'
      });
    }
  }

  function onSignInWithFacebook(response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void {
    const res = response as ReactFacebookLoginInfo;

    if (response.hasOwnProperty('status')) {
      console.error(`Facebook sign in error: \n${ response }`);
      setToastProp({
        message: 'Erro ao comunicar com Facebook',
        show: true,
        type: 'error'
      });
    } else {
      UserService.canCreateUser({
        data: res.email as string,
        onSuccess: (canCreate) => {
          onSuccess(canCreate, {
            type: UserType.FACEBOOK_USER,
            name: res.name,
            email: res.email,
            facebookId: res.id,
          });
        },
        onComplete,
      })
    }
  }

  function onSuccessSignInWithGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline): void {
    const google = response as GoogleLoginResponse;
    const user: User = {
      type: UserType.GOOGLE_USER,
      name: google.getBasicProfile().getName(),
      email: google.getBasicProfile().getEmail(),
      googleId: google.googleId,
    };

    UserService.canCreateUser({
      data: google.getBasicProfile().getEmail(),
      onSuccess: (canCreate) => {
        onSuccess(canCreate, user);
      },
      onComplete,
    });
  }

  function onFailureSignInWithGoogle(response: any): void {
    setIsBlockingUI(false);

    if (response?.error !== 'popup_closed_by_user') {
      console.error(`Google sign in error: \n${ response }`);
      setToastProp({
        message: 'Erro ao comunicar com Google',
        show: true,
        type: 'error'
      })
    }
  }

  function onClick() { setIsBlockingUI(true) }

  return (
    <BackgroundTextNet>
      <CreateGrid>
        <Grid container
              item
              sm={6}
              justify='center'>
          <GoogleButton onSuccess={onSuccessSignInWithGoogle}
                        onClick={onClick}
                        onFailure={onFailureSignInWithGoogle}
                        variant='contained'
                        buttonText='Criar conta com Google' />
          <WhiteSpace spaceBottom={10} />
          <FacebookButton callBack={onSignInWithFacebook}
                          onClick={onClick}
                          variant='contained'
                          buttonText='Criar conta com Facebook' />
          <WhiteSpace spaceBottom={10} />
          <Divider size={12}/>
          <Button fullWidth
                  variant='contained'
                  color='primary'
                  startIcon={<MailOutline />}
                  onClick={signUpWithEmail}
          >
            Criar conta com E-mail e Senha
          </Button>
        </Grid>
      </CreateGrid>
    </BackgroundTextNet>
  )
}

export default withToast(withBlockUI(SignUp));
