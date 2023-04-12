import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import { nftauctionABI } from "../../constants/index";
import { mumbai } from "../../constants/index";
import { ContractTransaction } from "ethers";

const useNFTAuctionContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    address: mumbai.nftauction,
    abi: nftauctionABI,
    signerOrProvider: signer || provider,
  });

  const bidOnNFT = async (bidAmount: string): Promise<string> => {
    const tx: ContractTransaction = await contract?.bidOnNft({
      value: bidAmount,
    });
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const withdrawBid = async () => {
    const tx: ContractTransaction = await contract?.withdrawBid({
      gasLimit: 40000,
    });
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const getAuctionState = async (): Promise<BigInt> => {
    return contract?.getAuctionState();
  };

  const getCurrentAuction = async (): Promise<any> => {
    return contract?.getCurrentAuction();
  };

  const getBidderRefundAmount = async (address: string): Promise<BigInt> => {
    return contract?.getBidderRefundAmount(address);
  };

  return {
    contract,
    getAuctionState,
    getCurrentAuction,
    bidOnNFT,
    withdrawBid,
    getBidderRefundAmount,
  };
};

export default useNFTAuctionContract;
