import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const infuraId = '39f8d6d639634aa1a6dcb4e6f5040b9b'
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Example App",
      infuraId
    }
  },
};

export default providerOptions
