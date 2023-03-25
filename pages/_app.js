import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme'
import '../utils/style.scss'

export default function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}