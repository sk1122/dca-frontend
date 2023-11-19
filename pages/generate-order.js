

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { useData } from "../providers/Context";
import { ConnectButtonDCA } from "../components/common/ConnectButton";


const CreateYourPlan = () => {
  const router = useRouter();

  const { connectedWallet, coinAllocation, setCoinAllocation,
    amountPerPeriod, setAmountPerPeriod,
    recurringCycle, setRecurringCycle,
    openDropDown, setOpenDropDown, dummyCoins, chainData } = useData()


  const handleCoinAllocationChange = (event) => {
    setCoinAllocation(event);
    setOpenDropDown(false)
  };

  const handleAmountPerPeriodChange = (event) => {
    setAmountPerPeriod(event.target.value);
  };

  const handleRecurringCycleChange = (event) => {
    setRecurringCycle(event);
  };

  const handleSubmit = (event) => {
    // Submit the form data to your API here
    event.preventDefault();
    router.push('/order-processing')
  };

  const onArrowClick = () => {
    setOpenDropDown(!openDropDown);
  }

  return (
    <div className="py-32">
      <div className="bg-white rounded-2xl shadow-lg w-1/2 mx-auto">
        <div className="flex ">
          <div className="flex flex-col w-7/12 mt-5 ">
            <h2 className="text-3xl font-bold mb-5 pb-2 border-b px-10">Create your plan</h2>
            <div className="flex space-x-10 px-10">
              <div className="flex flex-col  mb-5 relative">
                <label className="mr-3 text-sm mb-2 font-medium">Coin allocation</label>
                <div className="flex space-x-2 p-2 bg-gray-200 rounded-md cursor-pointer" onClick={() => onArrowClick()}>
                  <Image src={coinAllocation?.logoURI} width={25} height={25} />
                  <span>{coinAllocation?.name}</span>
                  <span><Image src={"/images/down.png"} className={openDropDown ? 'rotate-180' : ''} width={20} height={20} /></span>
                </div>
                {
                  openDropDown &&
                  <div className="absolute bg-white w-full top-16 border  rounded-md">
                    {chainData.tokens.map(i => {
                      return <div className="flex cursor-pointer space-x-2 my-2 border-b p-2" onClick={() => handleCoinAllocationChange(i)}>
                        <Image src={i.logoURI} width={25} height={25} />
                        <span>{i.name}</span>
                      </div>
                    })}
                  </div>
                }

              </div>

              <div className="flex flex-col  mb-5">
                <label className="mr-3 text-sm font-medium mb-2">Amount per period</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded p-2 bg-gray-200 rounded-md"
                  value={`${amountPerPeriod}`}
                  onChange={handleAmountPerPeriodChange}
                />
              </div>
            </div>
            <div className="flex flex-col px-10 mb-5">
              <label className="mr-3 text-sm font-medium mb-4">Recurring cycle</label>
              <div className="flex space-x-4">
                {
                  ['Daily', 'Weekly', 'Monthly'].map(i => {
                    return <div className={`cursor-pointer text-center rounded-md py-2 ${recurringCycle === i ? 'border-2 border-blue-500' : 'border'}`} onClick={() => handleRecurringCycleChange(i)} style={{ width: '100px' }}>{i}</div>
                  })
                }
              </div>
            </div>
            <div className="text-gray-500 px-10">Your orders will be filled everyday at 00:00 GMP</div>

          </div>
          <div className="bg-voilet_shade_1 w-5/12 text-sm">
            <h2 className="text-3xl font-bold mb-5 pb-2 mt-5 px-6">Summary</h2>
            <div className="px-6 flex items-center justify-between ">
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-500 rotate-45" style={{ minWidth: '10px', minHeight: '10px', maxWidth: '10px', maxHeight: '10px' }}></div>
                <div>Created Time</div>
              </div>
              <div>2023-11-01 12:42</div>
            </div>
            <div className="px-6 flex items-center justify-between my-8">
              <div className="flex items-center space-x-2">
                <div className=" rotate-45" style={{ minWidth: '10px', minHeight: '10px', maxWidth: '10px', maxHeight: '10px' }}></div>
                <div>Total Amount</div>
              </div>
              <div>--</div>
            </div>
            <div className="px-6 flex items-center justify-between my-8">
              <div className="flex items-center space-x-2">
                <div className="bg-green-500 rotate-45" style={{ minWidth: '10px', minHeight: '10px', maxWidth: '10px', maxHeight: '10px' }}></div>
                <div>First Auto-Invest Date</div>
              </div>
              <div>{(new Date(new Date().setDate(new Date().getDate() + 1))).toDateString()}</div>
            </div>
            <div className="px-6 flex items-center justify-between my-8">
              <div className="flex items-center space-x-2">
                <div>% Transaction Fee (0.2%)</div>
              </div>
              <div>--USDT</div>
            </div>
            <div className="text-center my-8">
              {connectedWallet ? 
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-8/12"
                  onClick={handleSubmit}
                >
                  Deposit
                </button>
              : <ConnectButtonDCA />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateYourPlan;