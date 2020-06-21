import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';

import EnvVariables from '../utils/EnvVariables';
import Logo from '../../assets/logo.png';

export default function Header(): ReactElement {
  return (
    <Grid container
          item
          sm={ 6 }
          justify='center'
    >
      <img  src={Logo} alt="fireSpot"/>
    </Grid>
  );
}
