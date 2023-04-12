import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { Withdraw } from "@/components";
import useWithdrawEarned from "@/hooks/marketplace/useWithdrawEarned";
import useSellerEarned from "@/hooks/marketplace/useSellerEarned";

const MarketplaceWithdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const { address, isConnected: isWalletConnected } = useAccount();
  const {
    data: sellerEarned,
    refetch: sellerEarnedRefetch,
    isLoading: sellerEarnedLoading,
  } = useSellerEarned(address ? address : "");
  const { mutate: withdrawEarned } = useWithdrawEarned(
    handleWithdrawEarnedSuccess,
    handleWithdrawEarnedFailed
  );

  useEffect(() => {
    sellerEarnedRefetch();

    setIsConnected(isWalletConnected);
  }, [isWalletConnected, address]);

  function handleWithdrawEarned() {
    setIsLoading(true);
    withdrawEarned();
  }

  function handleWithdrawEarnedSuccess(transactionHash: string) {
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

  function handleWithdrawEarnedFailed() {
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
        title="Withdraw (Marketplace)"
        isLoading={isLoading}
        isConnected={isConnected}
        handleWithdraw={handleWithdrawEarned}
        amountReturn={
          sellerEarned
            ? ethers.utils.formatEther(sellerEarned!.toString()).toString()
            : ""
        }
        contractFunctionLoading={sellerEarnedLoading}
      />
    </div>
  );
};

export default MarketplaceWithdraw;
