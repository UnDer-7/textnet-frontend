import React, { ReactElement } from 'react';

import 'loaders.css/loaders.min.css';
import 'react-block-ui/style.css';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/esm/locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core';
import { Router } from 'react-router-dom';

import './App.scss';
import createBrowserHistory from './config/History';
import Routes from './Routes';
import MaterialThemeConfig from './config/MaterialTheme'
import { withToast, WithToastProps } from './component/HOC';
import InterceptorConfigure from './config/InterceptorConfigure';

function App({ setToastProp }: WithToastProps): ReactElement<WithToastProps> {
  InterceptorConfigure.configure(setToastProp);

  return (
    <MuiThemeProvider theme={MaterialThemeConfig}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
        <Router history={ createBrowserHistory }>
          <Routes />
        </Router>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default withToast(App)
