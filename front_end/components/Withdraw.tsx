import React from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Skeleton, Loading } from "@/components";

interface WithdrawProps {
  title: string;
  isConnected: boolean;
  contractFunctionLoading: boolean;
  amountReturn: string;
  isLoading: boolean;
  handleWithdraw: () => void;
}

const Withdraw = ({
  title,
  isConnected,
  contractFunctionLoading,
  amountReturn,
  isLoading,
  handleWithdraw,
}: WithdrawProps) => {
  const { openConnectModal } = useConnectModal();

  function connectWallet() {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  }

  return (
    <div>
      <div className="w-[50%] mx-auto">
        <div className="flex items-center justify-start">
          <div className="mx-auto w-full max-w-lg">
            <div className="flex justify-center items-center gap-5">
              <h1 className="text-4xl font-medium text-center">{title}</h1>
            </div>
            <div className="mt-10">
              {!isConnected ? (
                <div>
                  <h3 className="my-3 text-xl font-medium text-center">
                    Connect wallet to check your withdrawable amount
                  </h3>
                </div>
              ) : contractFunctionLoading ? (
                <>
                  <Skeleton />
                </>
              ) : (
                <div className="relative z-0 my-5">
                  <input
                    type="text"
                    disabled={true}
                    value={amountReturn}
                    name="tokenId"
                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                  />
                  <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-gray-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                    Withdrawable amount
                  </label>
                </div>
              )}

              {!isConnected ? (
                <div className="flex justify-end items-center ">
                  <div
                    className="w-fit mt-5 border border-1 border-white select-none cursor-pointer px-5 py-3 rounded-lg hover:scale-110 transition"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex justify-end items-center mt-5">
                  <Loading title="Loading" />
                </div>
              ) : (
                <div className="flex justify-center lg:justify-end items-center">
                  <button
                    onClick={handleWithdraw}
                    className="mt-5 rounded-md bg-black px-10 py-2 text-white border border-1 border-gray-400"
                  >
                    Withdraw
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
