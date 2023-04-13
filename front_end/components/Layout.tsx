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
      <div className="relative">
        <div className="absolute bottom-4 right-4">
          <div className="group text-2xl cursor-pointer text-gray-400">
            <div className="hidden group-peer:flex absolute right-10 -top-10">
              NFT contract:
            </div>
            <BsInfoCircleFill />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
