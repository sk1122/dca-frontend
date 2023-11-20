import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const BitcoinInvestmentCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full  py-16 bg-white rounded-2xl shadow-lg ">
      <div>
        <h2 className="text-2xl font-light leading-snug text-center tracking-wider">
          If you had invested <span className="text-secondary">$</span>
          <label htmlFor="amount"></label>
          <input
            type="number"
            className="border-b-2 border-dashed border-secondary px-2"
            style={{
              width: "100px",
            }}
          />
          {/* <select name="amount" id="amount" className='text-secondary'>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
          </select> */}
          every
          <label htmlFor="time"></label>
          <select
            name="time"
            id="time"
            className="text-secondary border-b-2 border-secondary border-dashed"
          >
            <option value="month">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          in <br />
          <label htmlFor="transaction"></label>
          <select
            name="transaction"
            id="transaction"
            className="text-secondary border-b-2 border-secondary border-dashed"
          >
            <option value="1">Bitcoin</option>
            <option value="2">Ether</option>
            <option value="2">USDT</option>
          </select>
          for
          <label htmlFor="years"></label>
          <select
            name="years"
            id="years"
            className="text-secondary border-b-2 border-secondary border-dashed"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>{" "}
          times, you'd get
        </h2>
      </div>
      <div className="text-center border-t-2 w-full mt-10 border-dashed">
        <div className="text-4xl  text-primary font-bold mt-4 pt-10">
          $ 40,000
        </div>
        <h3 className="text-2xl font-light leading-snug ">
          As your current investment value
        </h3>
        <h4 className="text-xl text-gray-400 leading-snug mt-2">
          by investing $ 20,000
        </h4>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-ternanay">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-primary text-6xl font-bold">
          DCA into Cryptocurrency
        </h1>
        <p className="text-secondary text-2xl my-2">
          The non-custodial way to systematically invest into crypto assets
        </p>
        <Link href={"/dashboard"}>
          <button className="bg-primary text-white font-bold rounded-md px-10 py-2 my-10">
            ENTER APP
          </button>
        </Link>

        <BitcoinInvestmentCard />
      </main>
    </div>
  );
}
