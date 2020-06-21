import { createMuiTheme, Theme } from '@material-ui/core';
import EnvVariables from '../utils/EnvVariables';

const materialConfig: Theme = createMuiTheme({
  palette: {
    primary: {
      main: EnvVariables.PRIMARY_COLOR,
    },
    secondary: {
      main: EnvVariables.SECONDARY_COLOR,
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        background: 'white',
        borderRadius: '4px',
      }
    }
  }
});

export default materialConfig;
