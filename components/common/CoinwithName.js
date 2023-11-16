import Image from "next/image"

const CoinWithName = ({ name, icon }) => {
  return <span className="inline-flex m-4 p-2 align-center bg-gray-200 rounded-md">
    <Image src={icon} width={25} height={25} />
    <span className="px-2 font-bold">{name}</span>
  </span>
}

export default CoinWithName