import { useState } from "react"
import Link from "next/link";
import Image from "next/image";

const PortFolio = () => {
  const [isHidden, setHidden] = useState(true)
  const handlePrivacy = () => {
    setHidden(!isHidden)
  }
  return <div className="py-32">
    <div className="bg-white p-16 bg-white rounded-2xl shadow-lg w-1/2 mx-auto text-lg relative">
      <button className="absolute right-5 top-5" onClick={() => handlePrivacy()}>
        <Image className={isHidden ? "" : "apply-blue-filter"} src="/images/hidden_eye.png" height={18} width={18} />
      </button>
      <div className="flex justify-evenly space-x-20 ">
        <div className="">
          <div className="mb-8 mt-4">
            <div>My PortFolio Value</div>
            <div>{isHidden ? "******" : `$4234234`}</div>
          </div>
          {/* <div className="mb-16 mt-4">
            <div>My Index-Linked Value</div>
            <div>{isHidden ? "******" : `$237232`}</div>
          </div> */}
          <div className="font-bold text-primary">
            Remaining Balance: <span className="text-black font-normal">$5934</span>
          </div>
        </div>
        <div>
          <div className="mt-4">
            <div>Profit & Loss</div>
            <div className="mt-2">{isHidden ? "******" : `$12322`}</div>
            <div className="text-gray-400 text-sm">{isHidden ? "******" : `$3413`}</div>
          </div>
          {/* <div className="mt-4 mb-10">
            <div>Profit & Loss</div>
            <div className="mt-2">{isHidden ? "******" : `$382736`}</div>
            <div className="text-gray-400 text-sm">{isHidden ? "******" : `$127312`}</div>
          </div> */}
          <Link href={"/history"} className="font-bold text-primary">
            History
          </Link>
        </div>
      </div>
    </div >
  </div>
}

export default PortFolio;