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

  return {
    contract,
  };
};

export default useNFTAuctionContract;
