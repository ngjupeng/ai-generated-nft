import { useQuery } from "@tanstack/react-query";
import useAINFTContract from "../contracts/useAINFTContract";

const useMinimumUSDAmount = () => {
  const contract = useAINFTContract();

  return useQuery({
    queryKey: ["minimumUSDAmount"],
    queryFn: () => contract.getMinimumUSDAmount(),
  });
};

export default useMinimumUSDAmount;
