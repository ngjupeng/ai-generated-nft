import { useQuery } from "@tanstack/react-query";
import useAuctionContract from "../contracts/useNFTAuctionContract";

const useBidderRefundAmount = (address: string) => {
  const contract = useAuctionContract();

  return useQuery({
    queryKey: ["bidderRefundAmount"],
    queryFn: () => contract.getBidderRefundAmount(address),
  });
};

export default useBidderRefundAmount;
