import Link from "next/link";
import { ConnectButtonDCA } from "../common/ConnectButton";

const Header = () => {
  return <nav className="w-full flex justify-center items-center border-b-2 shadow-lg">
    <div className="w-full flex justify-between items-center px-6">
      <Link href="/" className="text-primary font-extrabold text-5xl text-center">Pulse DCA</Link>
      <div className="text-center py-8 px-4">
          <ConnectButtonDCA />
        </div>
    </div>
  </nav>
}

export default Header;