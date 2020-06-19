import React, { ReactElement } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import AuthRoutes, { AUTH_PATH_PREFIX } from './page/auth/AuthRoutes';

export default function Routes(): ReactElement {
  return (
    <Switch>
      <Redirect to={AUTH_PATH_PREFIX} from='/' exact />

      <Route path={AUTH_PATH_PREFIX} component={ AuthRoutes } />
    </Switch>
  );
}
