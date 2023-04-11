import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { configureChains, goerli, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import Layout from "@/components/Layout";

// TODO: configure alchemyProvider
const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "AI Generated NFT",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
const apolloClient = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/43988/ai-generated-nft/v0.0.3",
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
