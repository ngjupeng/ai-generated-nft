import { useMutation } from "@tanstack/react-query";
import useNFTMarketplaceContract from "../contracts/useNFTMarketplace";

const useWithdrawEarned = (
  onSuccess: (transactionHash: string) => void,
  onError: () => void
) => {
  const contract = useNFTMarketplaceContract();

  return useMutation({
    mutationFn: contract?.withdrawEarned,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useWithdrawEarned;
