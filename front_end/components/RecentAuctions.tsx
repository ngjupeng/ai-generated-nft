import React from "react";
import { FaEthereum } from "react-icons/fa";
import Winner from "./Winner";
import { AuctionsEndType } from "../types/TAuctionsEnd";

const RecentAuctions = ({
  recentAuctions,
}: {
  recentAuctions: AuctionsEndType[];
}) => {
  return (
    <div>
      {recentAuctions?.length <= 0 ? (
        <div className="text-center">No auction record yet...</div>
      ) : (
        <div>
          <div>
            <h3 className="text-center text-lg mb-3">Recent Ended Auctions</h3>
          </div>
          <div>
            <ul className="mx-auto w-fit divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <div></div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentAuctions;
