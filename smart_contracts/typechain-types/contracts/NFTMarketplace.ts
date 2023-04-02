/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace NFTMarketplace {
  export type ListedItemStruct = {
    seller: PromiseOrValue<string>;
    nftContractAddr: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
  };

  export type ListedItemStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    seller: string;
    nftContractAddr: string;
    tokenId: BigNumber;
    price: BigNumber;
  };
}

export interface NFTMarketplaceInterface extends utils.Interface {
  functions: {
    "buyNft(address,uint256)": FunctionFragment;
    "cancelListing(address,uint256)": FunctionFragment;
    "getListedItem(address,uint256)": FunctionFragment;
    "getListedNftLikes(address,uint256)": FunctionFragment;
    "getSellerEarned(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "sellNft(address,uint256,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upadteNftSellingState(address,uint256,uint256)": FunctionFragment;
    "voteOnNft(address,uint256)": FunctionFragment;
    "withdraw()": FunctionFragment;
    "withdrawEarned()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "buyNft"
      | "cancelListing"
      | "getListedItem"
      | "getListedNftLikes"
      | "getSellerEarned"
      | "owner"
      | "renounceOwnership"
      | "sellNft"
      | "transferOwnership"
      | "upadteNftSellingState"
      | "voteOnNft"
      | "withdraw"
      | "withdrawEarned"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "buyNft",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelListing",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getListedItem",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getListedNftLikes",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSellerEarned",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sellNft",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upadteNftSellingState",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "voteOnNft",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawEarned",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "buyNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getListedItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getListedNftLikes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSellerEarned",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sellNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upadteNftSellingState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "voteOnNft", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawEarned",
    data: BytesLike
  ): Result;

  events: {
    "CancelListing(address,uint256)": EventFragment;
    "NFTSold(address,address,uint256,uint256)": EventFragment;
    "NewNFTItemListed(address,address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "VoteOnNft(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CancelListing"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTSold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewNFTItemListed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteOnNft"): EventFragment;
}

export interface CancelListingEventObject {
  nftContractAddr: string;
  tokenId: BigNumber;
}
export type CancelListingEvent = TypedEvent<
  [string, BigNumber],
  CancelListingEventObject
>;

export type CancelListingEventFilter = TypedEventFilter<CancelListingEvent>;

export interface NFTSoldEventObject {
  buyer: string;
  nftContractAddr: string;
  tokenId: BigNumber;
  price: BigNumber;
}
export type NFTSoldEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  NFTSoldEventObject
>;

export type NFTSoldEventFilter = TypedEventFilter<NFTSoldEvent>;

export interface NewNFTItemListedEventObject {
  seller: string;
  nftContractAddr: string;
  tokenId: BigNumber;
  price: BigNumber;
}
export type NewNFTItemListedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  NewNFTItemListedEventObject
>;

export type NewNFTItemListedEventFilter =
  TypedEventFilter<NewNFTItemListedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface VoteOnNftEventObject {
  nftContractAddr: string;
  tokenId: BigNumber;
  totalVote: BigNumber;
}
export type VoteOnNftEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  VoteOnNftEventObject
>;

export type VoteOnNftEventFilter = TypedEventFilter<VoteOnNftEvent>;

export interface NFTMarketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NFTMarketplaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    buyNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelListing(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getListedItem(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[NFTMarketplace.ListedItemStructOutput]>;

    getListedNftLikes(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSellerEarned(
      _seller: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sellNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upadteNftSellingState(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _updatePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    voteOnNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawEarned(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  buyNft(
    _nftContractAddr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelListing(
    _nftContractAddr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getListedItem(
    _nftContractAddr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<NFTMarketplace.ListedItemStructOutput>;

  getListedNftLikes(
    _nftContractAddr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSellerEarned(
    _seller: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sellNft(
    _nftContractAddr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upadteNftSellingState(
    _nftContractAddr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _updatePrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  voteOnNft(
    _nftContractAddr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawEarned(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    buyNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelListing(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getListedItem(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<NFTMarketplace.ListedItemStructOutput>;

    getListedNftLikes(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSellerEarned(
      _seller: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    sellNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upadteNftSellingState(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _updatePrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    voteOnNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;

    withdrawEarned(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "CancelListing(address,uint256)"(
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): CancelListingEventFilter;
    CancelListing(
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): CancelListingEventFilter;

    "NFTSold(address,address,uint256,uint256)"(
      buyer?: PromiseOrValue<string> | null,
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): NFTSoldEventFilter;
    NFTSold(
      buyer?: PromiseOrValue<string> | null,
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): NFTSoldEventFilter;

    "NewNFTItemListed(address,address,uint256,uint256)"(
      seller?: PromiseOrValue<string> | null,
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): NewNFTItemListedEventFilter;
    NewNFTItemListed(
      seller?: PromiseOrValue<string> | null,
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): NewNFTItemListedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "VoteOnNft(address,uint256,uint256)"(
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      totalVote?: null
    ): VoteOnNftEventFilter;
    VoteOnNft(
      nftContractAddr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      totalVote?: null
    ): VoteOnNftEventFilter;
  };

  estimateGas: {
    buyNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelListing(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getListedItem(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getListedNftLikes(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSellerEarned(
      _seller: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sellNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upadteNftSellingState(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _updatePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    voteOnNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawEarned(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buyNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelListing(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getListedItem(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getListedNftLikes(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSellerEarned(
      _seller: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sellNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upadteNftSellingState(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _updatePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    voteOnNft(
      _nftContractAddr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawEarned(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
