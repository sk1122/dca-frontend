import Image from "next/image"
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import CoinWithName from "../components/common/CoinwithName";

const OrderSuccess = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/portfolio')
    }, 5000);
  }, [])
  return <div className="py-32">
    <div className="bg-white pb-16 bg-white rounded-2xl shadow-lg w-1/2 mx-auto">
      <CoinWithName name="BTH" icon={"/images/bitcoin.png"} />
      <div className="mx-auto text-center mt-16">
        <Image src="/images/correct.png" width={75} height={75} className="mx-auto" />
        <div className="font-bold text-2xl my-8">Deposit Success!</div>
        <Link href={"/portfolio"} className="text-primary font-bold">
          View on Explorer
        </Link>
      </div>
    </div >
  </div>
}

export default OrderSuccess;