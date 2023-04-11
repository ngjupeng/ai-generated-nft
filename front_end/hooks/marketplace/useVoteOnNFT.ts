import { useMutation } from "@tanstack/react-query";
import useNFTMarketplaceContract from "../contracts/useNFTMarketplace";

const useVoteOnNFT = (
  onSuccess: (transactionHash: string) => void,
  onError: (err: any) => void
) => {
  const contract = useNFTMarketplaceContract();

  return useMutation({
    mutationFn: contract?.voteOnNft,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useVoteOnNFT;
