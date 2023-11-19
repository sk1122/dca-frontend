import React, { createContext, useContext, useEffect, useState } from "react"
import { useAccount, useNetwork } from "wagmi"
import { evmChainData } from "../lib/data"

const WalletContext = createContext(null)

export const useData = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useConnectedWallet must be used within the wallet context")
  }
  return context
}

const dummyCoins = [{ id: 1, name: 'ETH', icon: "/images/eth.png" }, { id: 2, name: "ETH", icon: "/images/eth.png" }]

export default function Providers({ children }) {
  const [connectedWallet, setConnectedWallet] = useState(null)

  const [coinAllocation, setCoinAllocation] = useState(evmChainData[0].tokens[0]);
  const [amountPerPeriod, setAmountPerPeriod] = useState(100);
  const [recurringCycle, setRecurringCycle] = useState("Daily");
  const [openDropDown, setOpenDropDown] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [chainData, setChainData] = useState(evmChainData[0])
  
  const { address } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    if(address && chain) {
        setConnectedWallet({
            address,
            chain
        })

        const c = evmChainData.find(c => c.chainId === chain.id)
        setChainData(c)
        setCoinAllocation(c.tokens[0])
    } else {
        setConnectedWallet(null)
    }
  }, [address, chain])

  return (
    <WalletContext.Provider
      value={{
        connectedWallet,
        setConnectedWallet,
        coinAllocation, setCoinAllocation,
        amountPerPeriod, setAmountPerPeriod,
        recurringCycle, setRecurringCycle,
        openDropDown, setOpenDropDown,
        dummyCoins,
        successData, setSuccessData,
        chainData, setChainData
      }}
    >
        {children}
    </WalletContext.Provider>
  )
}