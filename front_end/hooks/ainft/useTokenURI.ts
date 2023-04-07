import { useQuery } from "@tanstack/react-query";
import useAINFTContract from "../contracts/useAINFTContract";

const useTokenURI = (
  tokenId: string,
  isQuery: boolean,
  onSuccess: (ipfsMetadata: string) => void
) => {
  const contract = useAINFTContract();

  return useQuery({
    queryKey: ["tokenURI", tokenId],
    queryFn: () => contract.getTokenURI(+tokenId),
    onSuccess: onSuccess,
    enabled: isQuery,
  });
};

export default useTokenURI;
