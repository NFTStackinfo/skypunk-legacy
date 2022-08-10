// constants
import Web3 from "web3";
import Web3Modal from 'web3modal'
import SmartContract from "../../contracts/SkyPunkLegacy.json";
// log
import { fetchData } from "../data/dataActions";

import providerOptions from './providerOptions'

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    console.group()
    dispatch(connectRequest())
    console.log('providerOptions', providerOptions)
    const web3Modal = new Web3Modal({
      network: 'rinkeby', // optional
      cacheProvider: false, // optional
      providerOptions// required,
    })
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    try {
      // await window.ethereum.enable();
      await provider.enable()
      console.log('provider : ', provider)
      console.log('web3 : ', web3)
      const accounts = await web3.eth.getAccounts((error, accounts) => {
        if (error) throw error
        return accounts
      })
      const account = accounts[0]
      console.log('account : ', account)
      const networkId = await web3.eth.net.getId()
      console.log('networkId : ', networkId)
      //const NetworkData = await SmartContract.networks[networkId];

      // matic contract
      // if (networkId === '80001' || networkId === 80001) {
      //   const SmartContractObj = new web3.eth.Contract(
      //     SmartContract.abi,
      //     "0x0e4539d9abfcdb5ec704c4e81b51b314b762278c"
      //   );
      // matic contract

      // eth contract
      if (networkId === '4' || networkId === 4) {
        const SmartContractObj = new web3.eth.Contract(
          SmartContract.abi,

          '0x2931444b3F55c0fe66aB48F6fDE3020EBb7AC07e'
        )
      // eth contract

        dispatch(
          connectSuccess({
            account,
            smartContract: SmartContractObj,
            web3: web3
          })
        )
        // Add listeners start
        provider.on('accountsChanged', (accounts) => {
          if (accounts[0] !== account) {
            console.group('accountsChanged')
            console.log(accounts)
            dispatch(updateAccount(accounts[0]))
            console.groupEnd()
          }
        })

        // Subscribe to chainId change
        provider.on('chainChanged', (chainId) => {
          if (+chainId !== +networkId) {
            console.group('chainChanged')
            // window.location.reload()
            console.log(chainId)
            console.groupEnd()
          }
        })

        // Subscribe to session disconnection
        provider.on('disconnect', (code, reason) => {
          console.group('disconnect')
          console.log(code, reason)
          console.groupEnd()
        })
        // Add listeners end
      } else {
        dispatch(connectFailed('Change network to ETH.'))
      }
    } catch (err) {
      console.log('err : ', err)
      dispatch(connectFailed('Something went wrong.'))
    }
    console.groupEnd()
  }
}

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
