import Loading from "@/components/Loading";
import React, { useEffect, useState } from "react";
import { goerli } from "../constants/";
import { useAccount } from "wagmi";
import truncateEthAddress from "truncate-eth-address";
import { SuccessAlert } from "@/components";
import { ethers } from "ethers";
import { useApproveNFT } from "@/hooks/ainft";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { isNumber } from "@/utils/isNumber";
import { ToastContainer, toast } from "react-toastify";
import { RiAlarmWarningLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { useListItem } from "@/hooks/marketplace";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

const SellNFT = () => {
  const { openConnectModal } = useConnectModal();
  const { address: walletAddress, isConnected: isWalletConnected } =
    useAccount();
  const { mutate: approveNFT, isLoading: approveLoading } = useApproveNFT(
    handleApproveNFTSuccess,
    handleApproveNFTFailed
  );
  const { mutate: listItem, isLoading: listingLoading } = useListItem(
    handleListItemSuccess,
    handleListItemFailed
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true);
  const [sellForm, setSellForm] = useState({
    address: goerli.ainft,
    tokenId: "",
    amount: "",
  });
  const [currentStepper, setCurrentStepper] = useState("approve");
  const [address, setAddress] = useState<string | undefined>("");

  useEffect(() => {
    setIsConnected(isWalletConnected);
  }, [isWalletConnected]);

  useEffect(() => {
    setIsConnected(isWalletConnected);
    setAddress(walletAddress);
  }, [isWalletConnected]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSellForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSellOnClick() {
    if (
      sellForm.address === "" ||
      sellForm.amount === "" ||
      sellForm.tokenId === "" ||
      !ethers.utils.isAddress(sellForm.address) ||
      !isNumber(+sellForm.amount) ||
      !Number.isInteger(+sellForm.tokenId)
    ) {
      setIsValidInput(false);
    } else {
      setIsValidInput(true);
      setIsLoading(true);
      showMenu(true);
    }
  }

  function resetState() {
    setCurrentStepper("approve");
    showMenu(false);
    setIsLoading(false);
  }

  function showMenu(toogle: boolean) {
    setIsMenuShow(toogle);
    if (!toogle) {
      setIsLoading(false);
      setCurrentStepper("approve");
    }
  }

  function connectWallet() {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  }

  function handleApproveNFTSuccess(transactionHash: string) {
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
    setCurrentStepper("sell");
  }

  function handleApproveNFTFailed() {
    toast.error("Approve failed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  function handleApprove() {
    approveNFT({
      to: goerli.nftmarketplace,
      nftContractAddr: sellForm.address,
      tokenId: sellForm.tokenId,
    });
  }

  function handleSellConfirm() {
    listItem({
      nftContractAddr: sellForm.address,
      price: ethers.utils.parseEther(sellForm.amount).toString(),
      tokenId: sellForm.tokenId,
    });
  }

  function handleListItemSuccess(transactionHash: string) {
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
    resetState();
    setSellForm({
      address: goerli.ainft,
      tokenId: "",
      amount: "",
    });
  }

  function handleListItemFailed() {
    toast.error("List item failed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <div className="px-10">
      <ToastContainer />
      <div className="w-[80%] lg:w-[50%] mx-auto">
        <div className="flex items-center justify-start">
          <div className="mx-auto w-full max-w-lg">
            <div className="flex items-center gap-5">
              <h1 className="text-4xl font-medium text-center">
                Sell your NFT
              </h1>
              <div className="cursor-pointer group relative">
                <Tooltip
                  anchorSelect=".my-anchor-element"
                  place="top"
                  className="text-sm max-w-[200px]"
                >
                  <div>
                    Please make sures you entered the correct NFTS contract
                    address and token ID to prevent the risk of losing the
                    funds.
                  </div>
                </Tooltip>
                <a className="my-anchor-element" data-tooltip-id="my-tooltip">
                  <RiAlarmWarningLine className="text-4xl" />
                </a>
              </div>
            </div>
            <div className="mt-10">
              <div className="relative z-0 my-5">
                <input
                  onChange={handleOnChange}
                  type="text"
                  name="address"
                  value={sellForm.address}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  NFT contract address
                </label>
              </div>
              <div className="relative z-0 my-5">
                <input
                  onChange={handleOnChange}
                  type="text"
                  name="tokenId"
                  value={sellForm.tokenId}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Token ID
                </label>
              </div>
              <div className="relative z-0 my-5">
                <input
                  onChange={handleOnChange}
                  type="text"
                  name="amount"
                  value={sellForm.amount}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Price (ETH)
                </label>
              </div>
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
                <div className="flex justify-center items-center mt-5">
                  <Loading title="Loading" />
                </div>
              ) : (
                <div className="flex justify-center lg:justify-end items-center">
                  <button
                    onClick={() => {
                      handleSellOnClick();
                    }}
                    className="mt-5 rounded-md bg-black px-10 py-2 text-white border border-1 border-gray-400"
                  >
                    Sell
                  </button>
                </div>
              )}
            </div>
            {!isValidInput && (
              <SuccessAlert description="Invalid input" isFailure={true} />
            )}
          </div>
        </div>
      </div>

      {/* popup modal */}
      <div className="relative flex justify-center items-center">
        <div
          id="menu"
          className={`${
            isMenuShow ? "" : "hidden"
          } w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0`}
        >
          <div className="2xl:container 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
            <div className="w-96 md:w-auto bg-gray-800 relative flex flex-col justify-center items-cente px-3 py-5">
              <div className="pr-20">
                {/* stepper */}
                <div>
                  <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-200 bg-white rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800  sm:p-4 sm:space-x-4">
                    <li
                      className={`${
                        currentStepper === "approve" ? "text-blue-600" : ""
                      } flex items-center`}
                    >
                      <span
                        className={`${
                          currentStepper === "approve" ? "border-blue-500" : ""
                        } flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0`}
                      >
                        1
                      </span>
                      Approve Token{" "}
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 sm:ml-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        ></path>
                      </svg>
                    </li>
                    <li
                      className={`${
                        currentStepper == "sell" ? "text-blue-600" : ""
                      } flex items-center`}
                    >
                      <span
                        className={`${
                          currentStepper == "sell" ? "border-blue-500" : ""
                        } flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 `}
                      >
                        2
                      </span>
                      Sell{" "}
                    </li>
                  </ol>
                </div>
              </div>
              {/* main body */}
              <div className="px-5">
                {currentStepper == "approve" ? (
                  <div className="flex flex-col gap-7">
                    <div>
                      Approve from:{" "}
                      {truncateEthAddress(address === undefined ? "" : address)}
                    </div>
                    <div>
                      Approve to: {truncateEthAddress(goerli.nftmarketplace)}
                    </div>
                    <div>
                      NFT contract: {truncateEthAddress(sellForm.address)}
                    </div>
                    <div>Approve token id: {sellForm.tokenId}</div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleApprove}
                        disabled={approveLoading}
                        className="mt-5 rounded-m px-10 py-2 text-white border border-1 border-gray-400"
                      >
                        {approveLoading ? "Loading..." : "Approve"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-7">
                    <h3 className="txt-lg font-semibold">Confirmation</h3>
                    <div>
                      Listing on: {truncateEthAddress(goerli.nftauction)}
                    </div>
                    <div>Seller: {truncateEthAddress(address ?? "")}</div>
                    <div>Selling token id: {sellForm.tokenId}</div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSellConfirm}
                        className="mt-5 rounded-m px-10 py-2 text-white border border-1 border-gray-400"
                      >
                        {listingLoading ? "Loading..." : "Sell"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => showMenu(false)}
                className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                aria-label="close"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellNFT;
