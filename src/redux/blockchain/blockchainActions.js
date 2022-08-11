// constants
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import SmartContract from '../../contracts/SkyPunkLegacy.json'
// log
import { fetchData } from '../data/dataActions'

import providerOptions from './providerOptions'

const connectRequest = () => {
  return {
    type: 'CONNECTION_REQUEST'
  }
}

const connectSuccess = (payload) => {
  return {
    type: 'CONNECTION_SUCCESS',
    payload: payload
  }
}

const connectFailed = (payload) => {
  return {
    type: 'CONNECTION_FAILED',
    payload: payload
  }
}

const updateAccountRequest = (payload) => {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload
  }
}

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest())
    const web3Modal = new Web3Modal({
      network: 'rinkeby', // optional
      cacheProvider: false, // optional
      providerOptions// required,
    })
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    try {
      await provider.enable()
      const accounts = await web3.eth.getAccounts((error, accounts) => {
        if (error) throw error
        return accounts
      })
      const account = accounts[0]
      const networkId = await web3.eth.net.getId()
      //const NetworkData = await SmartContract.networks[networkId];

      if (networkId === '4' || networkId === 4) {
        const SmartContractObj = new web3.eth.Contract(
          SmartContract.abi,
          '0x55ef7f7da37caac5bc3271d5fdbbafe725cb13fd'
        )

        dispatch(
          connectSuccess({
            account,
            smartContract: SmartContractObj,
            web3: web3
          })
        )
        // Add listeners start
        provider.on('accountsChanged', (accounts) => {
          dispatch(updateAccount(accounts[0]))
        })

        // Subscribe to chainId change
        provider.on('chainChanged', (chainId) => {
          if (+chainId !== +networkId) {
            window.location.reload()
          }
        })
        // Add listeners end
      } else {
        dispatch(connectFailed({
          code: 'CHANGE_NETWORK',
          message: 'Change network to ETH.'
        }))
      }
    } catch (err) {
      console.log('err : ', err)
      dispatch(connectFailed({
        code: 'SOMETHING_WENT_WRONG',
        message: 'Something went wrong.'
      }))
    }
    // console.groupEnd()
  }
}

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }))
    dispatch(fetchData(account))
  }
}
