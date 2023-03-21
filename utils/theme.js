import { createTheme } from '@mui/material/styles';

// #ff8a65 #811f00 #f9fbdc
const theme = createTheme({
  palette: {
    primary: {
      main: '#811f00',
    },
    secondary: {
      light: '#f9fbdc',
      main: '#ff8a65',
    },
  },
});

export default theme;