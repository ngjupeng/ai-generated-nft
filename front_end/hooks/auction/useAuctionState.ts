import { useQuery } from "@tanstack/react-query";
import useAuctionContract from "../contracts/useNFTAuctionContract";

const useAuctionState = () => {
  const contract = useAuctionContract();

  return useQuery({
    queryKey: ["auctionState"],
    queryFn: () => contract.getAuctionState(),
  });
};

export default useAuctionState;
