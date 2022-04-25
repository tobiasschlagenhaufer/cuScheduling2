import Head from 'next/head'
import type { AppProps } from 'next/app'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createClient, Provider, defaultExchanges } from 'urql'

const colors = {
  brand: {
    red: '#CE2D4F',
    pink: '#ce6d8b',
    white: '#F3EEF0',
    pink_l: '#E89BAC',
  }
}
const theme = extendTheme({ colors })

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
