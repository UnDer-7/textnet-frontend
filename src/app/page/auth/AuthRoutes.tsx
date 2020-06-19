import React, { ReactElement } from 'react';

import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import SignIn from './sign-in/SignIn';

export const AUTH_PATH_PREFIX: string = '/auth';
export const SIGN_IN_PATH: string = `${ AUTH_PATH_PREFIX }/sign-in`;

export default function AuthRoutes({ match, location }: RouteComponentProps): ReactElement<RouteComponentProps> {
  const { path } = match;
  const { pathname } = location;

  const canRedirectToSignIn =
    pathname === AUTH_PATH_PREFIX ||
    pathname === `${ AUTH_PATH_PREFIX }/`;

  return (
    <Switch>
      {
        canRedirectToSignIn && (<Redirect to={ SIGN_IN_PATH } from={path} />)
      }
      <Route
      exact
      path={ SIGN_IN_PATH }
      component={ SignIn }
      />
    </Switch>
  );
}
