import React from "react";
import truncateEthAddress from "truncate-eth-address";
import { FaEthereum } from "react-icons/fa";

const Winner = () => {
  return (
    <li className="py-3 sm:pt-4">
      <div className="flex justify-between items-center space-x-4">
        <div className="flex items-center gap-1">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div>
              <div className="flex-1 flex items-center gap-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {truncateEthAddress(
                    "0xC8965DD608a2a1293027E42Bf63c5E180436591d"
                  )}{" "}
                </p>
                <span>won the auction!</span>
              </div>
              <div>Received limited edition NFT no.5</div>
              <div>
                <time className="ml-1 mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  an hour ago.
                </time>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center font-inline-flex gap-1 text-base  text-gray-900 dark:text-white">
          <span>0.5</span> <FaEthereum />
        </div>
      </div>
    </li>
  );
};

export default Winner;
