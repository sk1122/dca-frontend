import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export const dummyData = [{
  id: 1,
  name: "ETH",
  '6M': 12,
  '1YR': 168,
  '3YR': -324,
  '5YR': 213,
  icon: "/images/eth.png"
}, {
  id: 2,
  name: "ETH",
  '6M': -7,
  '1YR': 242,
  '3YR': 134,
  '5YR': 400,
  icon: "/images/eth.png"
},
  // {
  //   id: 3,
  //   name: "USDT",
  //   '6M': 20,
  //   '1YR': -23,
  //   '3YR': 457,
  //   '5YR': 222,
  //   icon: "/images/bitcoin.png"
  // },
  // {
  //   id: 4,
  //   name: "BTH",
  //   '6M': 7,
  //   '1YR': 168,
  //   '3YR': 333,
  //   '5YR': 213,
  //   icon: "/images/eth.png"
  // }
]

const DataComponent = ({ item }) => {
  const router = useRouter()
  const [selectedReturn, setSelectedReturn] = useState("5YR")

  const showSelectedReturn = (i) => {
    return i?.[selectedReturn];
  }

  const changeTerm = (i) => {
    setSelectedReturn(i)
  }

  const handleCreatePlan = (item) => {
    router.push(`/generate-order?id=${item.id}`)
  }

  return (
    <tr className="py-2 border-b">
      <td className="flex py-5 px-4 space-x-3 items-center ">
        <Image src={item.icon} width={25} height={25} />
        <span>{item.name}</span>
      </td>
      <td >
        <span className={showSelectedReturn(item) > 0 ? 'text-green-500' : 'text-red-500'}>{showSelectedReturn(item)}%</span>
      </td>
      {
        ["5YR", "3YR", "1YR", "6M"].map(i => {
          return <td onClick={() => changeTerm(i)}><span className={`cursor-pointer bg-gray-200 px-3 py-2 rounded-md ${selectedReturn === i ? 'text-orange-500 font-bold' : ''}`} >{i}</span></td>
        })
      }
      <td className="text-right">
        <button className='bg-primary text-white font-bold rounded-md px-4 py-2 my-4 text-sm' onClick={() => handleCreatePlan(item)}>CREATE PLAN</button>
      </td>
    </tr>
  )
}

const Dashboard = () => {

  return <div className=" text-center">
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
          {
            dummyData.map(item => <DataComponent item={item} />)
          }
        </tbody>
      </table>
    </div>
  </div >
}

export default Dashboard;