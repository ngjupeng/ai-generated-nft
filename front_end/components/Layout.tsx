import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { StarCanvas } from "./canvas";
import Footer from "./Footer";
import Head from "next/head";

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
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
