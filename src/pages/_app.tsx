import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../config/createEmotionCache'

import type { AppProps } from 'next/app'

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1E1E1E',
      paper: '#252525'
    },
    text: {
      primary: '#EBEBEB'
    }
  },
});

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
  <ApolloProvider client={client}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  </ApolloProvider>
)}
