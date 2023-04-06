import dynamic from "next/dynamic";
import React from "react";
import truncateEthAddress from "truncate-eth-address";
import { MetaMaskAvatar } from "react-metamask-avatar";
import Tilt from "react-parallax-tilt";
import { FaEthereum } from "react-icons/fa";
import { useAuctionState } from "@/hooks/auction";
import { AuctionSkeleton, RecentAuctions, Skeleton } from "@/components";
import OpeningSoon from "@/components/OpeningSoon";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRecentAuctions } from "@/hooks/graph/useRecentAuctions";

const Auction = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const { data: auctionState, isLoading: isAuctionStateLoading } =
    useAuctionState();
  const { data: recentAuctions, loading: recentAuctionsLoading } =
    useRecentAuctions();
  console.log(recentAuctions);
  async function connectWallet() {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  }

  return (
    <div>
      {isAuctionStateLoading && recentAuctionsLoading ? (
        <>
          <div className="mx-auto w-fit">
            <AuctionSkeleton />
          </div>
        </>
      ) : !auctionState ? (
        // auction closed
        <>
          <div>
            <OpeningSoon />
            <div className="my-7" />
            <RecentAuctions recentAuctions={recentAuctions?.auctionEnds} />
          </div>
        </>
      ) : (
        <div>
          <div className="text-center mb-10">
            Auction close in <span className="font-bold">5:16:32</span>
          </div>
          <div>
            <div className="flex justify-center items-center gap-x-10">
              <div>
                <Tilt>
                  <div className="mx-auto">
                    <img
                      src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
                      alt=""
                      className="h-[250px] object-cover mx-auto rounded-lg"
                    />
                  </div>
                </Tilt>

                <div className="mt-5 flex flex-col items-center">
                  <div className="flex items-center">
                    Highest Bidder:{" "}
                    <div className="ml-2 mt-1 mr-1">
                      <MetaMaskAvatar address="0xA0a2233c1f8CD2e549B2f864F095A7c464ac1Ee9" />
                    </div>
                    <div>
                      {" "}
                      {truncateEthAddress(
                        "0xC8965DD608a2a1293027E42Bf63c5E180436591d"
                      )}
                    </div>{" "}
                  </div>
                  <div className="flex items-center">
                    Highest Bid Amount:{" "}
                    <div className="flex gap-1 items-center  ml-2 mt-1 mr-1">
                      <span>0.7</span>
                      <FaEthereum className="text-lg" />
                    </div>{" "}
                  </div>
                </div>
                {isConnected ? (
                  <form>
                    <div
                      className="w-fit mx-auto mt-5 border border-1 border-white select-none cursor-pointer px-5 py-3 rounded-lg hover:scale-110 transition"
                      onClick={connectWallet}
                    >
                      Bid
                    </div>
                  </form>
                ) : (
                  <div
                    className="w-fit mx-auto mt-5 border border-1 border-white select-none cursor-pointer px-5 py-3 rounded-lg hover:scale-110 transition"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </div>
                )}
              </div>
              <div>
                <RecentAuctions recentAuctions={recentAuctions.auctionEnds} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auction;
