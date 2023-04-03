import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import { ainftABI } from "../../constants/index";
import { goerli } from "../../constants/index";
import { ContractTransaction } from "ethers";

const useAINFTContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    address: goerli.ainft,
    abi: ainftABI,
    signerOrProvider: signer || provider,
  });

  const mintNft = async (tokenUri: string): Promise<string> => {
    const tx: ContractTransaction = await contract?.mintNft(tokenUri);
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const getMinimumUSDAmount = async (): Promise<BigInt> => {
    return contract?.getMinimumUSDAmount();
  };

  return {
    contract,
    mintNft,
    getMinimumUSDAmount,
  };
};

export default useAINFTContract;
