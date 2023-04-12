import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { Withdraw } from "@/components";
import { useBidderRefundAmount, useWithdrawBid } from "@/hooks/auction";

const AuctionWithdraw = () => {
  const { address, isConnected: isWalletConnected } = useAccount();
  const {
    data: bidderRefundAmount,
    refetch: bidderRefundAmountRefetch,
    isLoading: bidderRefundAmountLoading,
  } = useBidderRefundAmount(address ? address : "");
  const { mutate: withdrawBid } = useWithdrawBid(
    handleWithdrawBidSuccess,
    handleWithdrawBidFailed
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    bidderRefundAmountRefetch();
    setIsConnected(isWalletConnected);
  }, [address, isWalletConnected]);

  // invoked when withdraw bid button clicked
  function handleWithdrawBid() {
    setIsLoading(true);
    withdrawBid();
  }

  // invoked when withdraw bid success
  function handleWithdrawBidSuccess(transactionHash: string) {
    setTimeout(() => {
      toast.success("Transaction successfully, view your transaction detail!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        onClick: () => {
          const url = `https://mumbai.polygonscan.com/tx/${transactionHash}`;
          window.open(url, "_blank", "noopener,noreferrer");
        },
      });
    }, 100);
    setIsLoading(false);
  }

  // invoked when withdraw bid failed
  function handleWithdrawBidFailed() {
    setTimeout(() => {
      toast.error("Something went wrong, please try later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }, 100);
    setIsLoading(false);
  }

  return (
    <div>
      <Withdraw
        title="Withdraw (Auction)"
        isLoading={isLoading}
        isConnected={isConnected}
        handleWithdraw={handleWithdrawBid}
        amountReturn={
          bidderRefundAmount
            ? ethers.utils
                .formatEther(bidderRefundAmount!.toString())
                .toString()
            : ""
        }
        contractFunctionLoading={bidderRefundAmountLoading}
      />
    </div>
  );
};

export default AuctionWithdraw;
