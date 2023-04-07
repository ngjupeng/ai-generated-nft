import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import { nftauctionABI } from "../../constants/index";
import { goerli } from "../../constants/index";
import { ContractTransaction } from "ethers";

const useNFTAuctionContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    address: goerli.nftauction,
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

  const getAuctionState = async (): Promise<BigInt> => {
    return contract?.getAuctionState();
  };

  const getCurrentAuction = async (): Promise<any> => {
    return contract?.getCurrentAuction();
  };

  return {
    contract,
    getAuctionState,
    getCurrentAuction,
    bidOnNFT,
  };
};

export default useNFTAuctionContract;
