import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme'

export default function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}