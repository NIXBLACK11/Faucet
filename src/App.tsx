import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
 
import '@solana/wallet-adapter-react-ui/styles.css';

import { Home } from "./pages/Home";
import ThemeToggleButton from './components/ThemeToggleButton';

export default function App() {
  const network = WalletAdapterNetwork.Devnet;
  const wallets = useMemo(
      () => [
          new UnsafeBurnerWalletAdapter(),
      ],
      [network]
  );
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <div className="w-screen h-screen p-0 m-0">
                <ThemeToggleButton />
                <Home/>
              </div>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}