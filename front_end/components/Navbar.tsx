import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="w-full px-5 pt-5">
      <div className="grid grid-cols-3 place-items-center justify-between px-5">
        <div className="text-3xl place-self-start">AINFT.</div>
        <div className="flex justify-center items-center place-items-center gap-10">
          <Link href="/">Mint NFT</Link>
          <div>
            <button className="peer">Auction</button>
            <div
              className="hidden absolute peer-hover:flex hover:flex
         w-[200px] rounded-lg bg-white flex-col drop-shadow-lg border border-1 border-gray-300 text-black overflow-hidden"
            >
              <Link className="px-5 py-3 hover:bg-[#00000021]" href="/auction">
                Auction
              </Link>
              <Link
                className="px-5 py-3 hover:bg-[#00000021]"
                href="/auction-withdraw"
              >
                Withdraw
              </Link>
            </div>
          </div>
          <div>
            <button className="peer">Marketplace</button>
            <div
              className="z-[10] hidden absolute peer-hover:flex hover:flex
         w-[200px] rounded-lg bg-white flex-col drop-shadow-lg border border-1 border-gray-300 text-black overflow-hidden"
            >
              <Link
                className="px-5 py-3 hover:bg-[#00000021]"
                href="/marketplace"
              >
                Marketplace
              </Link>
              <Link className="px-5 py-3 hover:bg-[#00000021]" href="/sell-nft">
                Sell
              </Link>
              <Link
                className="px-5 py-3 hover:bg-[#00000021]"
                href="/marketplace-withdraw"
              >
                Withdraw
              </Link>
            </div>
          </div>
        </div>
        <div className="place-self-end">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
