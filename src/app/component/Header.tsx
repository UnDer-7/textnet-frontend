import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

import Logo from '../../assets/logo.png';

export default function Header(): ReactElement {
  return (
    <Grid container
          item
          sm={ 6 }
          justify='center'
    >
      <img  src={Logo} alt="textnet" style={{
        maxWidth: '100%',
        height: 'auto',
        width: '100%',
      }}/>
    </Grid>
  );
}
