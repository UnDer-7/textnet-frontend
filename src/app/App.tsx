import React from 'react';

import 'loaders.css/loaders.min.css';
import 'react-block-ui/style.css';
import { Router } from 'react-router-dom';

import './App.scss';
import createBrowserHistory from './config/History';
import Routes from './Routes';
import { MuiThemeProvider } from '@material-ui/core';
import MaterialThemeConfig from './config/MaterialTheme'

export default function App() {
  return (
    <MuiThemeProvider theme={MaterialThemeConfig}>
      <Router history={ createBrowserHistory }>
        <Routes />
      </Router>
    </MuiThemeProvider>
  );
}
