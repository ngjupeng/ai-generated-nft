import { useQuery } from "@tanstack/react-query";
import useAuctionContract from "../contracts/useNFTAuctionContract";

const useCurrentAuction = () => {
  const contract = useAuctionContract();

  return useQuery({
    queryKey: ["currentAuction"],
    queryFn: () => contract.getCurrentAuction(),
  });
};

export default useCurrentAuction;
