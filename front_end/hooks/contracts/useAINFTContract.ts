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

  const mintNft = async ({
    tokenUri,
    ethAmount,
  }: {
    tokenUri: string;
    ethAmount: string;
  }): Promise<string> => {
    const tx: ContractTransaction = await contract?.mintNft(tokenUri, {
      value: ethAmount,
    });
    try {
      const { transactionHash } = await tx.wait();
      return transactionHash;
    } catch (error) {
      throw error;
    }
  };

  const getLatestPrice = async (): Promise<BigInt> => {
    return contract?.getLatestPrice();
  };

  const getMinimumUSDAmount = async (): Promise<BigInt> => {
    return contract?.getMinimumUSDAmount();
  };

  return {
    contract,
    mintNft,
    getLatestPrice,
    getMinimumUSDAmount,
  };
};

export default useAINFTContract;
