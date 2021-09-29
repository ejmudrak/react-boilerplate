import { createTheme } from '@mui/material/styles';
import { green, purple, red } from '@mui/material/colors';

export default createTheme({
  palette: {
    primary: {
      main: '#62c2a0',
    },
    secondary: {
      main: purple['A400'],
    },
    error: {
      main: red[500],
    },
    success: {
      main: green['A400'],
    },
  },
});
