import React, { PropsWithChildren, ReactElement } from 'react';

import { Grid, GridJustification, GridSize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  GridContentAlignment,
  GridDirection,
  GridItemsAlignment,
  GridSpacing,
  GridWrap
} from '@material-ui/core/Grid/Grid';

const useStyles = makeStyles({
  minHeight: { minHeight: '100vh' },
});

interface CreateGridProps {
  alignContent?: GridContentAlignment;
  alignItems?: GridItemsAlignment;
  container?: boolean;
  direction?: GridDirection;
  item?: boolean;
  justify?: GridJustification;
  spacing?: GridSpacing;
  wrap?: GridWrap;
  zeroMinWidth?: boolean;
  lg?: GridSize;
  md?: GridSize;
  sm?: GridSize;
  xl?: GridSize;
  xs?: GridSize;
}

export default function CreateGrid(props: PropsWithChildren<CreateGridProps>): ReactElement<PropsWithChildren<CreateGridProps>> {
  const classes = useStyles();
  const { children } = props;

  return (
    <Grid container
          className={ classes.minHeight }
          item
          xs={ 12 }
          justify='center'
          alignItems='center'
    >
      <Grid {...props}>
        { children }
      </Grid>
    </Grid>
  )
}

CreateGrid.defaultProps = {
  container: true,
  item: true,
  lg: 7,
  md: 10,
  sm: 12,
  spacing: 1,
  direction: 'column',
  alignItems: 'center',
  justify: 'center',
}
