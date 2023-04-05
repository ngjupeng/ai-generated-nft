import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export const YourApp = () => {
  return <ConnectButton />;
};

const Navbar = () => {
  return (
    <div className="fixed top-5 z-10">
      <div className="grid grid-cols-3 justify-between w-screen px-5">
        <div className="text-3xl">AINFT.</div>
        <div className="flex-1 flex justify-center items-center gap-10">
          <Link href="/">Mint NFT</Link>
          <Link href="/auction">Auction</Link>
          <Link href="/marketplace">Marketplace</Link>
        </div>
        <div className="place-self-end">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
