import { useMutation } from "@tanstack/react-query";
import useAuctionContract from "../contracts/useNFTAuctionContract";

const useBidNFT = (
  onSuccess: (transactionHash: string) => void,
  onError: () => void
) => {
  const contract = useAuctionContract();

  return useMutation({
    mutationFn: contract.bidOnNFT,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useBidNFT;
