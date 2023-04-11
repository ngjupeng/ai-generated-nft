import { useQuery } from "@tanstack/react-query";
import useNFTMarketplaceContract from "../contracts/useNFTMarketplace";

const useSellerEarned = (address: string) => {
  const contract = useNFTMarketplaceContract();

  return useQuery({
    queryKey: ["getSellerEarned"],
    queryFn: () => contract.getSellerEarned(address),
    enabled: address !== "",
  });
};

export default useSellerEarned;
