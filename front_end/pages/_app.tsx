import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { configureChains, goerli, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

// TODO: configure alchemyProvider
const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
)
const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})
const apolloClient = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/43988/ai-generated-nft/v0.0.3',
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ApolloProvider>
    </WagmiConfig>
  )
}
