import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CoinWithName from "../components/common/CoinwithName";
import Loader from "../components/common/Loader";
import { useData } from "../providers/Context";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

const OrderProcessing = () => {
  const router = useRouter();

  const frequency = {
    HOURLY: 0,
    DAILY: 1,
    WEEKLY: 2,
    MONTHLY: 3,
  };

  const {
    connectedWallet,
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
  } = useData();

  const { config } = usePrepareContractWrite({
    address: "",
    abi: ["function createPosition(DCAData dcaData)"],
    functionName: "createPosition",
    args: [
      [
        frequency[recurringCycle],
        connectedWallet,
        coinAllocation,
        coinAllocation,
        amountPerPeriod,
        endtime,
        0,
        0,
        true,
      ],
    ],
  });

  const { data, isLoading, isError, isSuccess, writeAsync } =
    useContractWrite(config);

  const execute = async () => {
    const hash = await writeAsync?.();
    setSuccessData(hash);
    router.push("/order-success");
  };

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess) {
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <div className="py-32">
      <div className="bg-white pb-16 rounded-2xl shadow-lg w-1/2 mx-auto">
        <CoinWithName name="BTH" icon={"/images/bitcoin.png"} />
        <div className="mx-auto text-center mt-16">
          <div className="text-center mx-auto">
            <Loader />
          </div>
          <div className="font-bold text-2xl my-8">Confirm Deposit</div>
          <div className="flex space-x-6 align-center justify-center">
            <div className="flex space-x-2">
              <Image src="/images/bitcoin.png" height={24} width={24} />
              <div>10.0 USDC</div>
            </div>
            <div className="mt-2">
              <Image src="/images/arrow.png" height={12} width={12} />
            </div>
            <div className="flex space-x-2">
              <Image src="/images/eth.png" height={24} width={24} />
              <div>15.0 ETH</div>
            </div>
          </div>
          <div className="text-2xl  text-primary font-bold mt-4 pt-10">
            $ 40,000
          </div>
          <div className="text-gray-500">Processed In your Wallet</div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;
