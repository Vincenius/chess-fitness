import { createTheme } from '@mui/material/styles';

// #ff8a65 #B58863 #f9fbdc
const theme = createTheme({
  palette: {
    primary: {
      main: '#B58863',
      light: '#F0D9B5'
    },
    secondary: {
      light: '#f9fbdc',
      main: '#ff8a65',
    },
  },
});

export default theme;