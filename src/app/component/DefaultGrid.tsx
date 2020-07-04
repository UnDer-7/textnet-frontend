import React, { PropsWithChildren, ReactElement } from 'react';

import { Grid } from '@material-ui/core';

export default function DefaultGrid({ children }: PropsWithChildren<{}>): ReactElement {
  return (
    <Grid container item sm={ 6 }>
      {children}
    </Grid>
  )
}
