import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

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
      {["5YR", "3YR", "1YR", "6M"].map((i, idx) => {
        return (
          <td key={idx} onClick={() => changeTerm(i)}>
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
  const getPercentageChange = async (duration) => {
    const response = await axios.get("/api/get-token");

    const filteredResponse = response.data.filter((item) =>
      item.id.startsWith(`ETH-${duration}`)
    );

    const currentPrice = response.data[0].price;

    const prevPrice = filteredResponse[0].price;

    return Math.floor((100 * currentPrice) / prevPrice - 100);
  };
  const [percentage, setPercentage] = useState([]);
  const getPercentage = async () => {
    const dummyData = [
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
    setPercentage(dummyData);
  };
  useEffect(() => {
    getPercentage();
  }, []);
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
            {percentage.map((item, idx) => (
              <DataComponent key={idx} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
