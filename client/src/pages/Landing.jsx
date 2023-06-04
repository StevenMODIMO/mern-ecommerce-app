import { useEffect, useState } from "react";
import { GiHand } from "react-icons/gi";
import { BsFillBuildingsFill, BsFillBagFill } from "react-icons/bs";
import {
  FcElectronics,
  FcOvertime,
  FcComboChart,
  FcOnlineSupport,
} from "react-icons/fc";
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
    <div className="mt-5">
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
          <div className="flex justify-center text-9xl">
            <FcElectronics />
          </div>
          <p className="text-center font-sans text-green-900">
            Home of Electronics
          </p>
        </section>
        <section
          className={`slideshow-section ${
            currentSection === 1 ? "active" : ""
          }`}
        >
          <div className="flex justify-center text-9xl">
            <FcOvertime />
          </div>
          <p className="text-center font-sans text-green-900">
            Guaranteed Warranty
          </p>
        </section>

        <section
          className={`slideshow-section ${
            currentSection === 2 ? "active" : ""
          }`}
        >
          <div className="flex justify-center text-9xl">
            <FcComboChart />
          </div>
          <p className="text-center font-sans text-green-900">
            Trending Technology
          </p>
        </section>
      </main>
      <main className="mt-52 mb-10">
        <div className="flex justify-end">
          <BsFillBuildingsFill />
        </div>
        <div className="text-sm text-center">
          <p>
            mernEcommerce is an online shopping mall that connects buyers and
            sellers. Mainly with the focus of selling and buying of electronic
            components and accessories.{" "}
          </p>
        </div>
        <div className="flex justify-start">
          <BsFillBuildingsFill />
        </div>
      </main>
      <hr />
      <main>
        <p className="underline text-end mr-10">Our Features</p>
      </main>
      <main className="mt-10">
        <section className="mx-10 py-5 shadow-lg rounded ">
          <div className="flex justify-center text-6xl">
            <FcOnlineSupport />
          </div>
          <p className="text-lg underline text-center">24/7 Customer support</p>
          <p className="text-sm text-center">
            We value our customers, therefore we provide full support for any
            issues or challenge encountered across the platform.
          </p>
        </section>

        <section className="mx-10 py-5 mt-10 shadow-lg rounded ">
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
      </main>

      <footer className="text-sm text-green-500 text-center lg:hidden">
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
