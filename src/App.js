import "./fonts.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import PageLayout from "./shared/PageLayout/PageLayout";
import Pools from "./components/Dashboard/Pools/Pools";
import CreatePool from "./components/Dashboard/CreatePool/CreatePool";
import MarketPlace from "./components/Dashboard/MarketPlace/MarketPlace";
import PoolDetails from "./components/Dashboard/Pools/PoolDetails/PoolDetails";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.ropsten, chain.goerli, chain.hardhat],
  [
    alchemyProvider({ alchemyId: "https://eth-goerli.alchemyapi.io/v2/V5p1PckEwUqIq5s5rA2zvwRKH0V9Hslr" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Router>
            <PageLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/pools" element={<Pools />} />
                <Route path="/create-pool" element={<CreatePool />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/pools/:poolId" element={<PoolDetails />} />
              </Routes>
            </PageLayout>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
