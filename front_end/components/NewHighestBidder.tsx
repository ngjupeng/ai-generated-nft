import { HighestBidder } from "@/types/TNewHighestBidder";
import { ethers } from "ethers";
import moment from "moment";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import truncateEthAddress from "truncate-eth-address";

const NewHighestBidder = ({ bidder }: { bidder: HighestBidder }) => {
  return (
    <li className="mb-5 ml-6">
      <a
        href={`https://goerli.etherscan.io/tx/${bidder.transactionHash}`}
        className="block"
        target="_blank"
        rel="noreferrer noopenner"
      >
        <span className="absolute flex items-center justify-center w-2 h-2 bg-blue-100 rounded-full -left-1 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
        <div className="items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm sm:flex  dark:border-gray-600">
          <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
            <div className="select-none  rounded text-sm">
              <div>
                <div>
                  {truncateEthAddress(bidder.bidder)} just beated <br />
                  {truncateEthAddress(bidder.previousBidder)} with{" "}
                  <div className="flex items-center">
                    {" "}
                    {(+ethers.utils.formatEther(bidder.amount))
                      .toFixed(3)
                      .toString()}{" "}
                    <FaEthereum />
                  </div>
                </div>

                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  {moment.unix(Number(bidder.blockTimestamp)).fromNow()}
                </time>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default NewHighestBidder;
