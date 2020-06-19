import React from 'react';

import 'loaders.css/loaders.min.css';
import 'react-block-ui/style.css';
import { Router } from 'react-router-dom';

import './App.scss';
import createBrowserHistory from './config/History';
import Routes from './Routes';

export default function App() {
  return (
    <Router history={ createBrowserHistory }>
      <Routes />
    </Router>
  );
}
