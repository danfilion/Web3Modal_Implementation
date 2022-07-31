import './App.css'
import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

// All documentation for the Web3Modal : https://github.com/Web3Modal/web3modal

//Metamask included by default.
const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'My Awesome App', // Required
      infuraId: 'INFURA_ID', // Required
      rpc: '', // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
}

function App() {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
      });

      const web3ModalInstance = await web3Modal.connect()
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance,
      )

      web3ModalInstance.on("accountsChanged", (accounts) => {
        setAccountAddress(accounts[0]);
        console.log('Account changed.');
      });

      //console.log(web3ModalProvider);
      if (web3ModalProvider) {
        setWeb3Provider(web3ModalProvider)
        
        setAccountAddress(web3ModalProvider.provider.selectedAddress);
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3Modal Connection</h1>
        {web3Provider == null ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div>
            <p>Connected</p>
            {/* <p>Address: {web3Provider.provider.selectedAddress}</p> */}
            <p>Address: {accountAddress}</p>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
