import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { evmChainData } from "../lib/data";

const WalletContext = createContext(null);

export const useData = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error(
      "useConnectedWallet must be used within the wallet context"
    );
  }
  return context;
};

const dummyCoins = [
  { id: 1, name: "ETH", icon: "/images/eth.png" },
  { id: 2, name: "ETH", icon: "/images/eth.png" },
];

export default function Providers({ children }) {
  const [connectedWallet, setConnectedWallet] = useState(null);

  const [usdc, setUSDC] = useState(
    evmChainData[0].tokens.find(x => x.name === "USDC")
  )
  const [coinAllocation, setCoinAllocation] = useState(
    evmChainData[0].tokens[0]
  );
  const [times, setTimes] = useState(1)
  const [prices, setPrices] = useState({ "ETH": 1 })
  const [amountPerPeriod, setAmountPerPeriod] = useState(100);
  const [recurringCycle, setRecurringCycle] = useState("WEEKLY");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [chainData, setChainData] = useState(evmChainData[0]);
  const [endtime, setEndtime] = useState();

  const { address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    if (address && chain) {
      setConnectedWallet({
        address,
        chain,
      });

      const c = evmChainData.find((c) => c.chainId === chain.id);
      setChainData(c);
      console.log(coinAllocation);
      setCoinAllocation(c.tokens[0]);
      setUSDC(c.tokens.find(x => x.name === "USDC"))
    } else {
      setConnectedWallet(null);
    }
  }, [address, chain]);

  useEffect(() => {
    (async () => {
      const currentData = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum"
      );
      let currentPriceresponse = await currentData.json();
    
      const currentPrice = currentPriceresponse.market_data?.current_price.usd;
    
      setPrices({
        ...prices,
        "ETH": currentPrice
      })
    })()
  }, [])

  return (
    <WalletContext.Provider
      value={{
        connectedWallet,
        setConnectedWallet,
        coinAllocation,
        setCoinAllocation,
        amountPerPeriod,
        setAmountPerPeriod,
        recurringCycle,
        setRecurringCycle,
        endtime,
        setEndtime,
        openDropDown,
        setOpenDropDown,
        dummyCoins,
        successData,
        setSuccessData,
        chainData,
        setChainData,
        usdc,
        setUSDC,
        times,
        setTimes,
        prices,
        setPrices
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
