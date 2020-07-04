import React, { ReactElement } from 'react';

import { Button, Grid } from '@material-ui/core';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import {
  BackgroundTextNet, CreateGrid, FacebookButton,
  GoogleButton,
  Header,
  TextFieldWithError,
  WhiteSpace
} from '../../../component';
import Divider from '../../../component/Divider';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import AuthService from '../../../service/AuthService';
import { withBlockUI, WithBlockUIProps, withToast, WithToastProps } from '../../../component/HOC';
import Validations from '../../../utils/Validations';
import { PasswordWithEmail } from '../../../models/types/Form';
import { SIGN_UP_PATH } from '../AuthRoutes';

function SignIn({ setIsBlockingUI, setToastProp }: WithBlockUIProps<WithToastProps>): ReactElement {
  const { register, handleSubmit, errors } = useForm<PasswordWithEmail>();
  const history = useHistory();

  function onComplete(): void {
    setIsBlockingUI(false);
  }

  function onError(e: any): void {
    console.error('Erro ao fazer login: ', e);
    setIsBlockingUI(false);
  }

  function onSuccess(token: string): void {
    console.log('VER O QUE FAZ COM TOKEN: ', token); // todo: ver o que fazer com token
    setToastProp({
      type: 'success',
      show: true,
      message: 'Login realizado com sucesso',
    });
  }

  function onSignInWithEmail({email, password}: PasswordWithEmail): void {
    setIsBlockingUI(true);

    AuthService.signIn({
      data: {
        email,
        secret: password
      },
      onComplete,
      onError,
      onSuccess,
    })
  }

  function forgotPassword() {
    console.log('---IMPLEMENTAR----');
  }

  function newAccount() {
    history.push(SIGN_UP_PATH);
  }

  function onSignInWithFacebook(response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void {
    if (response.hasOwnProperty('status')) {
      setIsBlockingUI(false);
      console.warn('Error ao fazer login com Facebook: ', response);
    } else {
      const facebook = response as ReactFacebookLoginInfo;
      AuthService.signIn({
        data: {
          email: facebook.email as string,
          secret: facebook.id,
        },
        onComplete,
        onError,
        onSuccess,
      })
    }
  }

  function onSuccessSignInWithGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline): void {
    const google = response as GoogleLoginResponse;
    console.log('1: ');
    AuthService.signIn({
      data: {
        email: google.getBasicProfile().getEmail(),
        secret: google.getBasicProfile().getId()
      },
      onComplete,
      onError,
      onSuccess,
    });
  }

  function onFailureSignInWithGoogle(response: any): void {
    setIsBlockingUI(false)
    console.error(`Google sign in error: `, response);
  }

  return (
    <BackgroundTextNet >
      <form noValidate onSubmit={ handleSubmit(onSignInWithEmail) }>
        <CreateGrid >
          <Header/>
          <Grid container sm={ 6 } item>
            <GoogleButton onSuccess={ onSuccessSignInWithGoogle }
                          onFailure={ onFailureSignInWithGoogle }
                          variant='contained'
                          onClick={ () => setIsBlockingUI(true) }
                          buttonText='Entrar com Google'
            />
            <WhiteSpace spaceBottom={5}/>
            <FacebookButton onClick={() => setIsBlockingUI(true)}
                            callBack={onSignInWithFacebook}
                            variant='contained'
            />
          </Grid>

          <Grid container sm={ 6 } item>
            <Divider size={ 12 }/>
          </Grid>

          <TextFieldWithError fullWidth
                              required
                              name='email'
                              id='id_sign-in_email'
                              label='E-mail'
                              variant='filled'
                              type='email'
                              errors={ errors }
                              errMessage='Email inválido'
                              inputRef={ register(Validations.EMAIL) }
          />
          <TextFieldWithError fullWidth
                              required
                              errors={ errors }
                              name='password'
                              id='id_sign-in_password'
                              label='Senha'
                              variant='filled'
                              type='password'
                              inputRef={ register(Validations.THREE_LENGTH_MIN) }
          />
          <Grid container sm={ 6 } justify='flex-end' item>
            <Button variant='text'
                    color="secondary"
                    onClick={ forgotPassword }
            >
              Esqueceu a senha?
            </Button>
          </Grid>
          <Grid container sm={ 6 } item>
            <Button fullWidth
                    variant="contained"
                    color="primary"
                    type='submit'
            >
              Entrar
            </Button>
          </Grid>
          <Grid container sm={ 6 } item>
            <Button fullWidth
                    variant="contained"
                    color="secondary"
                    type='submit'
                    onClick={ newAccount }
            >
              Criar conta
            </Button>
          </Grid>
        </CreateGrid>
      </form>
    </BackgroundTextNet>
  );
}

export default withToast(withBlockUI(SignIn));
