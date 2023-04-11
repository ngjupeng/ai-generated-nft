import { Withdraw } from "@/components";
import { useBidderRefundAmount, useWithdrawBid } from "@/hooks/auction";
import useSellerEarned from "@/hooks/marketplace/useSellerEarned";
import useWithdrawEarned from "@/hooks/marketplace/useWithdrawEarned";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

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

  function handleWithdrawBid() {
    setIsLoading(true);
    withdrawBid();
  }

  function handleWithdrawBidSuccess(transactionHash: string) {
    toast.success("Transaction successfully, view your transaction detail!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      onClick: () => {
        const url = `https://goerli.etherscan.io/tx/${transactionHash}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
    });
    setIsLoading(false);
  }

  function handleWithdrawBidFailed() {
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
