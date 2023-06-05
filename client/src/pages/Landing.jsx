import { useEffect, useState } from "react";
import { GiHand } from "react-icons/gi";
import { BsFillBuildingsFill, BsFillBagFill } from "react-icons/bs";
import {
  FcElectronics,
  FcOvertime,
  FcComboChart,
  FcOnlineSupport,
  FcApproval,
  FcSearch
} from "react-icons/fc";
import Pic from "../assets/DrawKit-Vector-Illustration-ecommerce-01.svg"
import Pic1 from "../assets/DrawKit-Vector-Illustration-ecommerce-02.svg"
import { MdOutlinePrivacyTip } from "react-icons/md";
export default function Landing() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prevSection) => (prevSection + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-5 lg:mx-10">
      <header className="text-lg">
        <div className="flex justify-center text-3xl">
          <p>Hi!</p>
          <GiHand className="mt-1" />
        </div>
        <div className="text-center underline">
          <h1>Welcome to mernEcommerce</h1>
        </div>
      </header>
      <main className="mt-10 mx-2">
        <section
          className={`slideshow-section ${
            currentSection === 0 ? "active" : ""
          }`}
        >
          <div className="flex justify-center text-9xl lg:mt-10">
            <FcElectronics />
          </div>
          <p className="text-center font-sans text-yellow-600">
            Home of Electronics
          </p>
        </section>
        <section
          className={`slideshow-section ${
            currentSection === 1 ? "active" : ""
          }`}
        >
          <div className="flex justify-center text-9xl lg:mt-10">
            <FcOvertime />
          </div>
          <p className="text-center font-sans text-yellow-600">
            Guaranteed Warranty
          </p>
        </section>

        <section
          className={`slideshow-section ${
            currentSection === 2 ? "active" : ""
          }`}
        >
          <div className="flex justify-center text-9xl lg:mt-10">
            <FcComboChart />
          </div>
          <p className="text-center font-sans text-yellow-600">
            Trending Technologies
          </p>
        </section>
      </main>
      <main className="mt-52 mb-10 lg:grid grid-cols-3">
        <div className="hidden lg:flex flex-col">
          <img src={Pic} alt="sdsd" className="cursor-pointer h-80 -mt-44 lg:hover:scale-110 transition duration-700 ease-in-out" />
          <p className="text-lg text-center underline">Shop from anywhere</p>
        </div>
        <div className="text-lg p-2 m-3 text-center md:text-xl lg:text-2xl">
          <p>
            mernEcommerce is an online shopping mall that connects buyers and
            sellers. Mainly with the focus of selling and buying of electronic
            components and accessories.{" "}
          </p>
        </div>
        <div className="hidden lg:block">
          <img src={Pic1} alt="sdsd" className="cursor-pointer h-80 -mt-20 lg:hover:scale-110 transition duration-700 ease-in-out" />
          <p className="text-lg text-center underline">Join millions of others and shop unlimited......</p>
        </div>
      </main>
      <hr />
      <main>
        <p className="underline text-end mr-10">Our Features</p>
      </main>
      <main className="mt-10 sm:grid grid-cols-2 lg:grid-cols-4">
        <section className="cursor-pointer mx-10 py-5 px-3 shadow-lg rounded lg:hover:scale-110 transition duration-700 ease-in-out">
          <div className="flex justify-center text-6xl">
            <FcOnlineSupport />
          </div>
          <p className="text-lg underline text-center">24/7 Customer support</p>
          <p className="text-sm text-center">
            We value our customers, therefore we provide full support for any
            issues or challenge encountered across the platform.
          </p>
        </section>

        <section className="cursor-pointer mx-10 py-5 px-3 mt-10 shadow-lg rounded lg:hover:scale-110 transition duration-700 ease-in-out">
          <div className="flex justify-center text-6xl">
            <MdOutlinePrivacyTip />
          </div>
          <p className="text-lg underline text-center">Online Threat Protection</p>
          <p className="text-sm text-center">
            Our Security team is always alert against online threats such as
            credit card frauds and other threats. Feel secured while surfing
            across our platform
          </p>
        </section>

        <section className="cursor-pointer mx-10 py-5 px-3 mt-10 shadow-lg rounded lg:hover:scale-110 transition duration-700 ease-in-out">
          <div className="flex justify-center text-6xl">
            <FcApproval />
          </div>
          <p className="text-lg underline text-center">Approved Transactions</p>
          <p className="text-sm text-center">
           Both businesses and consumers are approved before conducting business in the platform, therefore never worry about your money as we are in charge of payments between two parties
          </p>
        </section>

        <section className="cursor-pointer mx-10 py-5 px-3 mt-10 shadow-lg rounded lg:hover:scale-110 transition duration-700 ease-in-out">
          <div className="flex justify-center text-6xl">
            <FcSearch />
          </div>
          <p className="text-lg underline text-center">Wide Search</p>
          <p className="text-sm text-center">
           Our marketing team ensures our customers have a wide range of search of their products within the platform. From home electronics up to business products.
          </p>
        </section>
      </main>

      <footer className="text-sm text-yellow-500 text-center mt-5">
        <div className="flex justify-center">
          <span className="text-2xl mr-2">&copy;</span>
          <span className="mt-2 mr-1">2023 mernEcommerce</span>
          <BsFillBagFill className="mt-2" />
        </div>
        <p> All rights reserved.</p>
      </footer>
    </div>
  );
}
