import { useMutation } from "@tanstack/react-query";
import useNFTMarketplaceContract from "../contracts/useNFTMarketplace";

const useUpdateListedItem = (
  onSuccess: (transactionHash: string) => void,
  onError: (err: any) => void
) => {
  const contract = useNFTMarketplaceContract();

  return useMutation({
    mutationFn: contract?.updateListedItem,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useUpdateListedItem;
