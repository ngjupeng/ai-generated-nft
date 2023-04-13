import { RecentMinter, NFTCard, SuccessAlert, Skeleton } from "@/components";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ToastContainer, toast } from "react-toastify";
import { FaEthereum } from "react-icons/fa";
import { GiMiner } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai";
import { blobToBase64 } from "@/utils/blobToBase64";
import { getEthAmount } from "@/utils/removeDecimals";
import { MintHistoryType } from "@/types/TMintHistory";
import { Loading } from "@/components";
import { useLatestPrice, useMintNFT } from "@/hooks/ainft";
import { useRequestImage, useUploadToNFtStorage } from "@/hooks/api";
import { useRecentMinters } from "@/hooks/graph";
import "react-toastify/dist/ReactToastify.css";

const Mint = () => {
  const { isConnected: isWalletConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { data: latestPriceData } = useLatestPrice();

  const { mutate: requestImage } = useRequestImage(
    handleRequestImageSuccess,
    handleRequestImageError
  );

  const { mutate: mintNFT } = useMintNFT(
    handlePaymentSuccess,
    handlePaymentFailure
  );

  const {
    data: recentMinters,
    loading: isRecentMintersLoading,
    refetch: refetchRecentMinters,
  } = useRecentMinters();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ipfsMetadata, setIpfsMetadata] = useState("");
  const [isRequestingImage, setIsRequestingImage] = useState(false);
  const [isUploadingToIPFS, setIsUploadingToIPFS] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isWaitingPayment, setIsWaitingPayment] = useState(false);
  const [isPaymentFailure, setIsPaymentFailure] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(isWalletConnected);
  }, [isWalletConnected]);

  // event handler
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  async function connectWallet() {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  }

  // if the metamask transaction is successful, call this
  async function handlePaymentSuccess(transactionHash: string) {
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
    setIsWaitingPayment(false);
    setIsSuccessful(true);
    // clear the success message after 20s
    setTimeout(() => {
      setIsSuccessful(false);
      setIsPaymentFailure(false);
    }, 20000);
    await refetchRecentMinters();
  }

  // if the metamask transaction is failed, call this
  function handlePaymentFailure() {
    setIsWaitingPayment(false);
    setIsPaymentFailure(true);

    setTimeout(() => {
      setIsPaymentFailure(false);
    }, 20000);
  }

  // call when click on the "minter" button
  async function handleMint() {
    // if nothing in description, not allow to proceed
    if (description.trim() === "") {
      return toast.error("Description cannot be empty!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    // initialize/reset the status
    setTitle("");
    setImageUrl("");
    setIsSuccessful(false);
    setIsPaymentFailure(false);
    setIsRequestingImage(true);
    requestImage(description);
  }

  // the stable diffusion return the image data as parameter
  async function handleRequestImageSuccess(data: any) {
    try {
      // convert to base64 format
      const base64 = await blobToBase64(data);
      setImageUrl(base64 as string);
      setIsRequestingImage(false);
      setIsUploadingToIPFS(true);
      // upload the base64 image to nft storage
      const metadata = await useUploadToNFtStorage(data, description);
      setIpfsMetadata(metadata.ipnft);
      setTitle(description);
      setDescription("");
      setIsUploadingToIPFS(false);
      setIsWaitingPayment(true);
      // wait for the user to confirm on metamask
      const payAmount = Number(
        getEthAmount(10.5, latestPriceData!.toString())
      ).toFixed(5);
      mintNFT({
        tokenUri: `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`,
        ethAmount: ethers.utils.parseEther(payAmount.toString()).toString(),
      });
    } catch (error) {
      setImageUrl("");
      setIsUploadingToIPFS(false);
      setIsWaitingPayment(false);
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
    }
  }

  // error handler for the failure happened on stable diffusion
  function handleRequestImageError() {
    setImageUrl("");
    setTimeout(() => {
      toast.error("Error when generating image!", {
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
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col lg:flex-row justify-center px-10">
        {/* nft card and description */}
        <div className="flex-[2] flex flex-col items-center">
          <div className="w-[90%] md:w-[70%] lg:w-[50%]">
            <h2 className="font-medium text-2xl tracking-widest text-center">
              {title ? (
                <div className="flex items-center gap-2 justify-center">
                  <h2>{title}</h2>
                  <a
                    className="block"
                    href={`https://ipfs.io/ipfs/${ipfsMetadata}/metadata.json`}
                    target="_blank"
                    rel="nonreferrer noopenner"
                  >
                    <AiOutlineLink className="text-blue-400" />
                  </a>
                </div>
              ) : (
                "Mint your first NFT!"
              )}
            </h2>
            <NFTCard imageUrl={imageUrl} metadata={ipfsMetadata} />
            <div className="mt-1 text-xs text-right flex items-center justify-end">
              {latestPriceData &&
                Number(getEthAmount(10.5, latestPriceData.toString())).toFixed(
                  4
                )}{" "}
              <FaEthereum className="text-xs" />
              /mint
            </div>
          </div>
          {!isConnected ? (
            <div
              className="mt-5 border border-1 border-white select-none cursor-pointer px-5 py-3 rounded-lg hover:scale-110 transition"
              onClick={connectWallet}
            >
              Connect Wallet
            </div>
          ) : (
            <div>
              {isRequestingImage ? (
                <Loading title="Generating image..." />
              ) : isUploadingToIPFS ? (
                <Loading title="Uploading to IPFS..." />
              ) : isWaitingPayment ? (
                <Loading title="Waiting transaction..." />
              ) : (
                <div className="flex items-center justif-center border border-x-0 border-t-0 border-b-2 border-gray-300">
                  <input
                    type="search"
                    id="default-search"
                    className="mt-5 px-5 py-2 block w-full text-sm border rounded-lg outline-none border-none bg-transparent text-white "
                    placeholder="Description here..."
                    required
                    autoComplete="off"
                    onChange={handleOnChange}
                  />
                  <div
                    onClick={handleMint}
                    className="cursor-pointer select-none mt-3 ml-2 text-xl transition hover:scale-125"
                  >
                    <GiMiner />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* alert messages mobile */}
        <div className="block lg:hidden">
          {isSuccessful && (
            <SuccessAlert
              isFailure={false}
              description="You successfully minted an AI generated NFT!"
            />
          )}
          {isPaymentFailure && (
            <SuccessAlert isFailure={true} description="Payment failed" />
          )}
        </div>

        {/* recent minters */}
        <div className="mt-10 lg:mt-0 flex-1">
          <div className="w-full lg:w-[80%]">
            <div className="flex items-center">
              <h2 className="text-lg">Recent Mint</h2>
              <span className="text-2xl">💥</span>
            </div>

            {isRecentMintersLoading ? (
              <div className="mt-5">
                <Skeleton />
              </div>
            ) : (
              <ol className="mt-10 relative border-l border-gray-200 dark:border-gray-700">
                {recentMinters?.mintedNewNFTs?.map(
                  (mintHistory: MintHistoryType) => (
                    <RecentMinter
                      key={mintHistory.transactionHash}
                      user={mintHistory.user}
                      blockTimestamp={mintHistory.blockTimestamp}
                      transactionHash={mintHistory.transactionHash}
                    />
                  )
                )}
              </ol>
            )}
          </div>
        </div>
      </div>
      {/* alert messages desktop */}
      <div className="hidden lg:block">
        {isSuccessful && (
          <SuccessAlert
            isFailure={false}
            description="You successfully minted an AI generated NFT!"
          />
        )}
        {isPaymentFailure && (
          <SuccessAlert isFailure={true} description="Payment failed" />
        )}
      </div>
    </div>
  );
};

export default Mint;
