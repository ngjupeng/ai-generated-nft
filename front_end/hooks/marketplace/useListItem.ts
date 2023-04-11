import { useMutation } from "@tanstack/react-query";
import useNFTMarketplaceContract from "../contracts/useNFTMarketplace";

const useListItem = (
  onSuccess: (transactionHash: string) => void,
  onError: () => void
) => {
  const contract = useNFTMarketplaceContract();

  return useMutation({
    mutationFn: contract?.listItem,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useListItem;
