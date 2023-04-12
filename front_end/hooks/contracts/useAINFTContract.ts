import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import { ainftABI, normalERC721ABI } from "../../constants/index";
import { mumbai } from "../../constants/index";
import { ContractTransaction, ethers } from "ethers";

const useAINFTContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    address: mumbai.ainft,
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

  const approveToken = async ({
    to,
    tokenId,
    nftContractAddr,
  }: {
    to: string;
    tokenId: string;
    nftContractAddr: string;
  }): Promise<string> => {
    const nftContract = new ethers.Contract(
      nftContractAddr,
      normalERC721ABI,
      signer || provider
    );

    try {
      const tx: ContractTransaction = await nftContract?.approve(to, tokenId, {
        gasLimit: 100000,
      });
      const { transactionHash } = await tx.wait();
      return transactionHash;
    } catch (error) {
      throw error;
    }
  };

  const getTokenURI = async (tokenId: number): Promise<string> => {
    return contract?.tokenURI(tokenId);
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
    getTokenURI,
    approveToken,
  };
};

export default useAINFTContract;
