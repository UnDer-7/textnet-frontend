import React, { ReactElement } from 'react';

import { Button, Grid } from '@material-ui/core';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

import { FacebookButton,
  GoogleButton,
  Header,
  TextFieldWithError,
  WhiteSpace } from '../../../component';
import Divider from '../../../component/Divider';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import AuthService from '../../../service/AuthService';
import { withBlockUI, WithBlockUIProps } from '../../../component/HOC';
import Validations from '../../../utils/Validations';
import { PasswordWithEmail } from '../../../models/types/Form';
import Background from '../../../../assets/background.jpg';

const useStyles = makeStyles({
  minHeight: { minHeight: '100vh' },
});

function SignIn({ setIsBlockingUI }: WithBlockUIProps): ReactElement {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<PasswordWithEmail>();

  function onComplete(): void {
    setIsBlockingUI(false);
  }

  function onError(e: any): void {
    console.error('Erro ao fazer login: ', e);
    setIsBlockingUI(false);
  }

  function onSignInWithEmail(data: PasswordWithEmail): void {
    setIsBlockingUI(true);
    AuthService.signInWithEmail({
      data,
      onComplete,
      onError})
  }

  function forgotPassword() {
    console.log('---IMPLEMENTAR----');
  }

  function newAccount() {
    console.log('---IMPLEMENTAR----');
  }

  function onSignInWithFacebook(response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void {
    if (response.hasOwnProperty('status')) {
      setIsBlockingUI(false);
      console.warn('Error ao fazer login com Facebook: ', response);
    } else {
      AuthService.signInWthFacebook({
        data: response as ReactFacebookLoginInfo,
        onError,
        onComplete,
      })
    }
  }

  function onSuccessSignInWithGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline): void {
    AuthService.signInWthGoogle({
      data: response as GoogleLoginResponse,
      onComplete,
      onError});
  }

  function onFailureSignInWithGoogle(response: any): void {
    setIsBlockingUI(false)
    if (response?.error !== 'popup_closed_by_user') {
      console.error(`Google sign in error: \n${ response }`);
    }
  }

  return (
    <div style={{ backgroundImage: `url(${Background})` }}>
      <div style={{
        padding: '10px'
      }}>
        <form noValidate onSubmit={ handleSubmit(onSignInWithEmail) }>
          <Grid container
                className={ classes.minHeight }
                item
                xs={ 12 }
                justify='center'
                alignItems='center'
          >
            <Grid container
                  item
                  lg={ 7 }
                  md={ 10 }
                  sm={ 12 }
                  spacing={ 1 }
                  direction='column'
                  alignItems='center'
                  justify='center'
            >
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

              <Grid container sm={ 6 } item>
                <TextFieldWithError errors={ errors }
                                    name='email'
                                    fullWidth
                                    required
                                    id='id_sign-in_email'
                                    label='E-mail'
                                    variant='filled'
                                    type='email'
                                    inputRef={ register(Validations.EMAIL) }
                />
              </Grid>
              <Grid container sm={ 6 } item>
                <TextFieldWithError fullWidth
                                    required
                                    errors={ errors }
                                    name='password'
                                    id='id_sign-in_password'
                                    label='Senha'
                                    variant='filled'
                                    type='password'
                                    inputRef={ register(Validations.PASSWORD) }
                />
              </Grid>
              <Grid container sm={ 6 } justify='flex-end' item>
                <Button variant='text'
                        color="primary"
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
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default withBlockUI(SignIn);
