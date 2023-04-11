import React, { useState } from "react";
import { ActiveItem } from "@/types/TActiveItem";
import { FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { CiMenuKebab } from "react-icons/ci";
import { useAccount } from "wagmi";
import { Tooltip } from "react-tooltip";
import truncateEthAddress from "truncate-eth-address";
import useTokenURI from "@/hooks/ainft/useTokenURI";
import useCancelListing from "@/hooks/marketplace/useCancelListing";
import useBuyNFT from "@/hooks/marketplace/useBuyNFT";
import useVoteOnNFT from "@/hooks/marketplace/useVoteOnNFT";
import useUpdateListedItem from "@/hooks/marketplace/useUpdateListedItem";
import { ToastContainer, toast } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

const NFTMarketCard = ({
  activeItem,
  activeItemsRefetch,
}: {
  activeItem: ActiveItem;
  activeItemsRefetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}) => {
  const { address, isConnected } = useAccount();
  const { data: auctionTokenIPFSMeta, refetch: auctionTokenIPFSRefetch } =
    useTokenURI("8", true, fetchImage);
  const { mutate: cancelList } = useCancelListing(
    handleCancelSuccess,
    handleTransactionFailed
  );
  const { mutate: buyNFT } = useBuyNFT(
    handleTransactionSuccess,
    handleTransactionFailed
  );
  const { mutate: voteNFT } = useVoteOnNFT(
    handleTransactionSuccess,
    handleTransactionFailed
  );
  const { mutate: updateListedItem } = useUpdateListedItem(
    handleTransactionSuccess,
    handleTransactionFailed
  );

  function handleCancelListClick() {
    cancelList({
      nftContractAddr: activeItem.nftAddress,
      tokenId: activeItem.tokenId,
    });
  }

  function handleCancelSuccess(transactionHash: string) {
    activeItemsRefetch();
    handleTransactionSuccess(transactionHash);
  }

  function handleTransactionSuccess(transactionHash: string) {
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
          const url = `https://goerli.etherscan.io/tx/${transactionHash}`;
          window.open(url, "_blank", "noopener,noreferrer");
        },
      });
    }, 100);
  }
  function handleTransactionFailed(err: any) {
    console.log(err);
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

  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  async function fetchImage(ipfsMetadata: string) {
    fetch(ipfsMetadata, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.description);
        const hashedToken = data.image.toString().replace("ipfs://", "");
        setImageUrl(`https://ipfs.io/ipfs/${hashedToken}`);
      });
  }

  return (
    <div className="relative w-full max-w-sm border border-gray-200 rounded-lg shadow bg-secondary dark:border-gray-700 h-[360px]">
      <Tooltip id="my-tooltip" />
      <ToastContainer />

      <div className="relative">
        <img
          className="h-[200px] w-full object-cover rounded-t-lg"
          src={imageUrl}
          alt="product image"
        />

        <div className="absolute top-2 right-2 transition hover:scale-110 cursor-pointer">
          <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Give a like!"
            data-tooltip-place="top"
          >
            <FcLike className="w-10 h-10 " />
          </a>
        </div>
      </div>
      <div className="px-5 pb-10 relative">
        <div>
          <h5 className="w-[80%] mt-5 mb-2 font-semibold tracking-tight text-gray-900 dark:text-white truncate">
            {/* {description} */}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
            ullam aspernatur laboriosam consequuntur quasi nisi, error, ea
            dolorum ab consequatur excepturi, similique ex itaque sed fugiat
            inventore natus accusantium dolor omnis soluta impedit! Omnis
            praesentium vero cumque quibusdam dolorum officiis modi, enim ex ea
            placeat deleniti voluptas illum maiores unde.
          </h5>
          <div>Owned By: {truncateEthAddress(activeItem.seller)}</div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            {" "}
            <span className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
              <span>{activeItem.votes}</span> <AiFillLike className="-mt-1" />
            </span>
            <span className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
              <span>{ethers.utils.formatEther(activeItem.price)}</span>{" "}
              <FaEthereum />
            </span>
          </div>
          {activeItem.seller.toUpperCase() === address?.toUpperCase() ? (
            <div
              className="w-full inline-flex justify-end rounded-md shadow-sm"
              role="group"
            >
              <button
                onClick={handleCancelListClick}
                type="button"
                className="px-2 py-1 text-sm font-medium rounded-l-md text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-2 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700"
              >
                Update
              </button>
            </div>
          ) : isConnected ? (
            <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
              Buy
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTMarketCard;
