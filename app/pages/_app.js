import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme'
import '../utils/style.scss'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  </ThemeProvider>
}