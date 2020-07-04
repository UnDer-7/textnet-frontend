import React, { ReactElement } from 'react';

import { Button, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { BackgroundTextNet, CreateGrid, TextFieldWithError, WhiteSpace } from '../../../component';
import { withBlockUI, WithBlockUIProps, withToast, WithToastProps } from '../../../component/HOC';
import { PasswordWithEmail } from '../../../models/types/Form';
import Validations from '../../../utils/Validations';
import UserService from '../../../service/UserService';
import { useHistory } from 'react-router-dom';
import { SIGN_UP_PATH_FORM } from '../AuthRoutes';
import UserStore from '../../../store/UserStore';
import UserType from '../../../models/UserType';

function SignUpWithEmail({ setIsBlockingUI, setToastProp }: WithBlockUIProps<WithToastProps>): ReactElement {
  const { register, handleSubmit, errors } = useForm<PasswordWithEmail>();

  const history = useHistory();

  function onComplete(): void {
    setIsBlockingUI(false);
  }

  function onError(e: any): void {
    console.error('Error: ', e);
    setIsBlockingUI(false);
  }

  function onSignInWithEmail(data: PasswordWithEmail): void {
    function onSuccess(canCreate: boolean): void {
      if (canCreate) {
        UserStore.send({
          email: data.email,
          password: data.password,
          type: UserType.PASSWORD_USER,
        });
        history.push(SIGN_UP_PATH_FORM);
      } else {
        setToastProp({
          show: true,
          message: 'E-mail já cadastrado',
          type: 'error',
        });
      }
    }

    setIsBlockingUI(true);

    UserService.canCreateUser({
      data: data.email,
      onComplete,
      onError,
      onSuccess,
    });
  }

  return (
    <BackgroundTextNet>
      <form noValidate onSubmit={ handleSubmit(onSignInWithEmail) }>
        <CreateGrid>
          <TextFieldWithError errors={ errors }
                              name='email'
                              fullWidth
                              id='id_sign-up-with-email_email'
                              label='E-mail'
                              variant='filled'
                              type='email'
                              inputRef={ register(Validations.EMAIL) }
          />
          <WhiteSpace spaceBottom={ 5 }/>
          <TextFieldWithError errors={ errors }
                              name='password'
                              fullWidth
                              id='id_sign-up-with-email_password'
                              label='Senha'
                              variant='filled'
                              type='password'
                              inputRef={ register(Validations.THREE_LENGTH_MIN) }
          />
          <WhiteSpace spaceBottom={ 10 }/>
          <Grid container item sm={6}>
            <Button fullWidth
                    variant='contained'
                    color='secondary'
                    type='submit'
            >
              Proximo passo
            </Button>
          </Grid>
        </CreateGrid>
      </form>
    </BackgroundTextNet>
  )
}

export default withToast(withBlockUI(SignUpWithEmail));
