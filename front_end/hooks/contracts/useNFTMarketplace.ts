import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import { nftmarketplaceABI } from "../../constants/index";
import { goerli } from "../../constants/index";
import { ContractTransaction } from "ethers";

const useNFTMarketplaceContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    address: goerli.nftmarketplace,
    abi: nftmarketplaceABI,
    signerOrProvider: signer || provider,
  });

  const listItem = async ({
    nftContractAddr,
    tokenId,
    price,
  }: {
    nftContractAddr: string;
    tokenId: string;
    price: string;
  }): Promise<string> => {
    const tx: ContractTransaction = await contract?.sellNft(
      nftContractAddr,
      tokenId,
      price
    );
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const updateListedItem = async ({
    nftContractAddr,
    tokenId,
    price,
  }: {
    nftContractAddr: string;
    tokenId: string;
    price: string;
  }): Promise<string> => {
    const tx: ContractTransaction = await contract?.upadteNftSellingState(
      nftContractAddr,
      tokenId,
      price,
      {
        gasLimit: 60000,
      }
    );
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const cancelListing = async ({
    nftContractAddr,
    tokenId,
  }: {
    nftContractAddr: string;
    tokenId: string;
  }): Promise<string> => {
    try {
      const tx: ContractTransaction = await contract?.cancelListing(
        nftContractAddr,
        tokenId,
        {
          gasLimit: 60000,
        }
      );
      const { transactionHash } = await tx.wait();
      return transactionHash;
    } catch (error) {
      throw error;
    }
  };

  const buyNft = async ({
    nftContractAddr,
    tokenId,
    buyAmount,
  }: {
    nftContractAddr: string;
    tokenId: string;
    buyAmount: string;
  }): Promise<string> => {
    const tx: ContractTransaction = await contract?.buyNft(
      nftContractAddr,
      tokenId,
      {
        value: buyAmount,
      }
    );
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const voteOnNft = async ({
    nftContractAddr,
    tokenId,
  }: {
    nftContractAddr: string;
    tokenId: string;
  }): Promise<string> => {
    const tx: ContractTransaction = await contract?.voteOnNft(
      nftContractAddr,
      tokenId,
      {
        gasLimit: 60000,
      }
    );
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const withdrawEarned = async (): Promise<string> => {
    const tx: ContractTransaction = await contract?.withdrawEarned({
      gasLimit: 50000,
    });
    const { transactionHash } = await tx.wait();
    return transactionHash;
  };

  const getSellerEarned = async (address: string): Promise<BigInt> => {
    return contract?.getSellerEarned(address);
  };

  return {
    contract,
    listItem,
    withdrawEarned,
    getSellerEarned,
    updateListedItem,
    cancelListing,
    buyNft,
    voteOnNft,
  };
};

export default useNFTMarketplaceContract;
