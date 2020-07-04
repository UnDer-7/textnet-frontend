import React, { ReactElement, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { Button, Grid } from '@material-ui/core';

import { BackgroundTextNet, CreateGrid, CustomDatePicker, TextFieldWithError } from '../../../component';
import { withBlockUI, WithBlockUIProps, withToast, WithToastProps } from '../../../component/HOC';
import User from '../../../models/User';
import Validations from '../../../utils/Validations';
import Sanitizer from '../../../utils/Sanitizer';
import UserStore from '../../../store/UserStore';
import UserService from '../../../service/UserService';
import UserType from '../../../models/UserType';
import Verify from '../../../utils/Verify';
import { useHistory } from 'react-router-dom';
import { SIGN_UP_PATH } from '../AuthRoutes';

const defaultValues = {
  password: undefined,
  cellphone: undefined,
  email: undefined,
  birthDate: null,
  name: undefined
}

function SignUpForm({ setIsBlockingUI, setToastProp }: WithBlockUIProps<WithToastProps>): ReactElement<WithBlockUIProps<WithToastProps>> {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    control
  } = useForm<User>({ defaultValues });
  const history = useHistory();

  const isPasswordUser = UserStore.currentUser()?.type === UserType.PASSWORD_USER;

  useEffect(() => {
    UserStore.listen().subscribe((data: User | null) => {
      reset({
        email: data?.email,
        name: data?.name,
        password: data?.password,
      });
    });

    return () => UserStore.unsubscribe()
  }, [reset])


  function onSuccess(response: any): void {
    setToastProp({
      message: 'Cadastro realizado com sucesso',
      show: true,
      type: 'success'
    });
  }

  function onError(error: any): void {
    console.log('ERROR: ', error);
  }

  function onComplete() {
    setIsBlockingUI(false);
  }

  function submit(data: User): void {
    data.cellphone = Sanitizer.cellphone(data.cellphone as string);
    setIsBlockingUI(true);

    UserService.createUser({
      data: {...data, ...UserStore.currentUser()},
      onSuccess,
      onError,
      onComplete,
    });
  }

  if (Verify.isUndefinedOrNull(UserStore.currentUser())) {
    history.push(SIGN_UP_PATH);
  }

  return (
    <BackgroundTextNet>
      <form noValidate onSubmit={ handleSubmit(submit) }>
        <CreateGrid>
          <TextFieldWithError fullWidth
                              disabled
                              name='email'
                              id='id_sign-up-form_email'
                              label='E-mail'
                              variant='filled'
                              type='email'
                              errors={ errors }
                              inputRef={ register(Validations.EMAIL) }
          />
          {isPasswordUser && (
            <TextFieldWithError fullWidth
                                disabled
                                name='password'
                                id='id_sign-up-form_password'
                                label='Senha'
                                variant='filled'
                                type='password'
                                errors={ errors }
                                inputRef={ register(Validations.THREE_LENGTH_MIN) }
            />
          )}
          <TextFieldWithError fullWidth
                              required
                              name='name'
                              id='id_sign-up-form_name'
                              label='Nome'
                              variant='filled'
                              type='text'
                              errors={ errors }
                              inputRef={ register(Validations.THREE_LENGTH_MIN) }
          />
          <CustomDatePicker required
                            name='birthDate'
                            errors={errors}
                            control={control}
          />
          <TextFieldWithError fullWidth
                              required
                              mask='(99) 99999-9999'
                              name='cellphone'
                              id='id_sign-up-form_cellphone'
                              label='Celular'
                              variant='filled'
                              type='text'
                              errors={ errors }
                              inputRef={ register(Validations.CELLPHONE) }
          />
          <Grid container item sm={ 6 }>
            <Button fullWidth
                    variant='contained'
                    color='secondary'
                    type='submit'
            >
              Cadastrar
            </Button>
          </Grid>
        </CreateGrid>
      </form>
    </BackgroundTextNet>
  )
}

export default withToast(withBlockUI(SignUpForm));
