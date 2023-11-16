import Link from "next/link";

const Header = () => {
  return <nav className="">
    <Link href="/" >
      <div className="text-primary font-extrabold text-5xl text-center py-6 border-b-2 shadow-lg">SIP</div>
    </Link>
  </nav>
}

export default Header;