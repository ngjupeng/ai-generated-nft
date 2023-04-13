import React, { PropsWithChildren } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import Head from "next/head";
import { StarCanvas } from "./canvas";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-primary flex flex-col justify-between text-white font-poppin min-h-screen relative z-0">
      <Head>
        <title>AINFT</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </Head>
      <div>
        <Navbar />
        <div className="z-[-1]">
          <StarCanvas />
        </div>
      </div>
      <div>{children}</div>
      <div className="hidden md:block absolute bottom-4 right-4">
        <div>
          <button
            type="button"
            className="peer px-4 py-2 text-xl font-medium text-white"
          >
            <BsInfoCircleFill />
          </button>
          <div
            className="hidden fixed bottom-10 right-[150px] translate-x-[50%] peer-hover:flex hover:flex
w-[200px] rounded-lg flex-col drop-shadow-lg border border-1 border-gray-300 text-white overflow-hidden z-[30]"
          >
            <a
              href="https://mumbai.polygonscan.com/address/0xfd10a534F783252154bA1D1287235546d27CF7aD"
              rel="noopener noreferrer"
              target="_blank"
              className="cursor-pointer px-3 py-2"
            >
              NFT Contract
            </a>
            <a
              href="https://mumbai.polygonscan.com/address/0x51B60E63eE80272EF66Cb206EF4372CDD27ce893"
              rel="noopener noreferrer"
              target="_blank"
              className="cursor-pointer px-3 py-2"
            >
              Auction Contract
            </a>
            <a
              href="https://mumbai.polygonscan.com/address/0xE27a16c32a4FD2b472FABC306BA8e4aE7119b7Ee"
              target="_blank"
              className="cursor-pointer px-3 py-2 truncate"
            >
              Marketplace Contract
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
