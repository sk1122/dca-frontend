import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const getPercentageChange = async (duration) => {
  const date = new Date();
  if (duration == 6) {
    date.setMonth(date.getMonth() - duration);
  } else {
    date.setFullYear(date.getFullYear() - duration);
  }

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "-");

  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${formattedDate}`
  );
  let prevPriceresponse = await data.json();
  const prevPrice = prevPriceresponse.market_data.current_price.usd;

  const currentData = await fetch(
    "https://api.coingecko.com/api/v3/coins/ethereum"
  );
  let currentPriceresponse = await currentData.json();

  const currentPrice = currentPriceresponse.market_data.current_price.usd;

  return (100 * currentPrice) / prevPrice - 100;
};

export const dummyData = [
  {
    id: 1,
    name: "ETH",
    "6M": await getPercentageChange(6),
    "1YR": await getPercentageChange(1),
    "3YR": await getPercentageChange(3),
    "5YR": await getPercentageChange(5),
    icon: "/images/eth.png",
  },
];

const DataComponent = ({ item }) => {
  const router = useRouter();
  const [selectedReturn, setSelectedReturn] = useState("5YR");

  const showSelectedReturn = (i) => {
    return i?.[selectedReturn];
  };

  const changeTerm = (i) => {
    setSelectedReturn(i);
  };

  const handleCreatePlan = (item) => {
    router.push(`/generate-order?id=${item.id}`);
  };

  return (
    <tr className="py-2 border-b">
      <td className="flex py-5 px-4 space-x-3 items-center ">
        <Image src={item.icon} width={25} height={25} />
        <span>{item.name}</span>
      </td>
      <td>
        <span
          className={
            showSelectedReturn(item) > 0 ? "text-green-500" : "text-red-500"
          }
        >
          {showSelectedReturn(item)}%
        </span>
      </td>
      {["5YR", "3YR", "1YR", "6M"].map((i) => {
        return (
          <td onClick={() => changeTerm(i)}>
            <span
              className={`cursor-pointer bg-gray-200 px-3 py-2 rounded-md ${
                selectedReturn === i ? "text-orange-500 font-bold" : ""
              }`}
            >
              {i}
            </span>
          </td>
        );
      })}
      <td className="text-right">
        <button
          className="bg-primary text-white font-bold rounded-md px-4 py-2 my-4 text-sm"
          onClick={() => handleCreatePlan(item)}
        >
          CREATE PLAN
        </button>
      </td>
    </tr>
  );
};

const Dashboard = () => {
  return (
    <div className=" text-center">
      <div className="w-9/12 text-center py-32 mx-auto">
        <table className="w-full px-20">
          <thead>
            <tr className="bg-voilet_shade_1 text-gray-400 ">
              <td className="py-2 text-left px-5">Product</td>
              <td className="py-2">Historical ROI</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody className="bg-white">
            {dummyData.map((item) => (
              <DataComponent item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
