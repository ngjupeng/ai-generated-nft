import { useMutation } from "@tanstack/react-query";
import useAINFTContract from "../contracts/useAINFTContract";

const useMintNFT = (
  onSuccess: (transactionHash: string) => void,
  onError: (transactionHash: string) => void
) => {
  const contract = useAINFTContract();

  return useMutation({
    mutationFn: contract.mintNft,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useMintNFT;
