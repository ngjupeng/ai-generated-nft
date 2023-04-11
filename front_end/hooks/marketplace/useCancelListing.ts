import { useMutation } from "@tanstack/react-query";
import useNFTMarketplaceContract from "../contracts/useNFTMarketplace";

const useCancelListing = (
  onSuccess: (transactionHash: string) => void,
  onError: (err: any) => void
) => {
  const contract = useNFTMarketplaceContract();

  return useMutation({
    mutationFn: contract?.cancelListing,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useCancelListing;
