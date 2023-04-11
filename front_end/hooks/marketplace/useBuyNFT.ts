import { useMutation } from "@tanstack/react-query";
import useNFTMarketplaceContract from "../contracts/useNFTMarketplace";

const useBuyNFT = (
  onSuccess: (transactionHash: string) => void,
  onError: (err: any) => void
) => {
  const contract = useNFTMarketplaceContract();

  return useMutation({
    mutationFn: contract?.buyNft,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useBuyNFT;
