import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import { nftmarketplaceABI } from "../../constants/index";
import { goerli } from "../../constants/index";
import { ContractTransaction } from "ethers";

const useNFTMarketplaceContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    address: goerli.nftauction,
    abi: nftmarketplaceABI,
    signerOrProvider: signer || provider,
  });

  return {
    contract,
  };
};

export default useNFTMarketplaceContract;
