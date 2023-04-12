import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="w-full md:px-5 pt-5 mb-3">
      <div className="grid grid-cols-2 md:grid-cols-3 place-items-center justify-between px-3 lg:px-5">
        <Link href={"/"}>
          <div className="flex items-center flex-row-reverse gap-2 text-3xl place-self-start cursor-pointer">
            AINFT.{" "}
            <Image src="/favicon.png" alt="My Image" width={30} height={30} />
          </div>
        </Link>
        <div className="hidden md:flex justify-center items-center place-items-center gap-10 z-[30]">
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
        <div className="z-[40] bg-gray-800 md:hidden fixed bottom-10 left-[50%] -translate-x-[50%]">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Link href={"/"}>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Mint
              </button>
            </Link>
            <div>
              <button
                type="button"
                className="peer px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Auction
              </button>
              <div
                className="hidden absolute bottom-[100%] right-[50%] translate-x-[50%] peer-focus:flex hover:flex
w-[200px] rounded-lg bg-white flex-col drop-shadow-lg border border-1 border-gray-300 text-black overflow-hidden z-[30]"
              >
                <Link
                  className="px-5 py-3 hover:bg-[#00000021]"
                  href="/auction"
                >
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
              <button
                type="button"
                className="peer px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Marketplace
              </button>
              <div
                className="hidden absolute bottom-[100%] right-[50%] translate-x-[50%] peer-focus:flex hover:flex
w-[200px] rounded-lg bg-white flex-col drop-shadow-lg border border-1 border-gray-300 text-black overflow-hidden z-[30]"
              >
                <Link
                  className="px-5 py-3 hover:bg-[#00000021]"
                  href="/marketplace"
                >
                  Marketplace
                </Link>
                <Link
                  className="px-5 py-3 hover:bg-[#00000021]"
                  href="/sell-nft"
                >
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
        </div>
        <div className="place-self-end">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
