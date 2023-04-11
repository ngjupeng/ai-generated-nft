import { useMutation } from "@tanstack/react-query";
import useAuctionContract from "../contracts/useNFTAuctionContract";

const useWithdrawBid = (
  onSuccess: (transactionHash: string) => void,
  onError: () => void
) => {
  const contract = useAuctionContract();

  return useMutation({
    mutationFn: contract.withdrawBid,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useWithdrawBid;
