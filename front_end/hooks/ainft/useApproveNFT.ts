import { useMutation } from "@tanstack/react-query";
import useAINFTContract from "../contracts/useAINFTContract";

const useApproveNFT = (
  onSuccess: (transactionHash: string) => void,
  onError: () => void
) => {
  const contract = useAINFTContract();

  return useMutation({
    mutationFn: contract.approveToken,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useApproveNFT;
