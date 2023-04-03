import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CancelListing as CancelListingEvent,
  NFTSold as NFTSoldEvent,
  NewNFTItemListed as NewNFTItemListedEvent,
  NFTMarketplaceOwnershipTransferred as NFTMarketplaceOwnershipTransferredEvent,
  VoteOnNft as VoteOnNftEvent,
} from "../generated/NFTMarketplace/NFTMarketplace";
import {
  ActiveItem,
  CancelListing,
  NFTSold,
  NewNFTItemListed,
  VoteOnNft,
} from "../generated/schema";

export function handleCancelListing(event: CancelListingEvent): void {
  let entity = new CancelListing(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let activeItem = ActiveItem.load(
    getId(event.params.tokenId, event.params.nftContractAddr.toString())
  );

  entity.nftContractAddr = event.params.nftContractAddr;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000notselling"
  );

  entity.save();
  activeItem!.save();
}

export function handleNFTSold(event: NFTSoldEvent): void {
  let entity = new NFTSold(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let activeItem = ActiveItem.load(
    getId(event.params.tokenId, event.params.nftContractAddr.toString())
  );

  entity.buyer = event.params.buyer;
  entity.nftContractAddr = event.params.nftContractAddr;
  entity.tokenId = event.params.tokenId;
  entity.price = event.params.price;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  activeItem!.buyer = event.params.buyer;

  entity.save();
  activeItem!.save();
}

export function handleNewNFTItemListed(event: NewNFTItemListedEvent): void {
  let entity = new NewNFTItemListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let newActiveItem = ActiveItem.load(
    getId(event.params.tokenId, event.params.nftContractAddr.toString())
  );

  if (!newActiveItem) {
    newActiveItem = new ActiveItem(
      getId(event.params.tokenId, event.params.nftContractAddr.toString())
    );
  }

  entity.seller = event.params.seller;
  entity.nftContractAddr = event.params.nftContractAddr;
  entity.tokenId = event.params.tokenId;
  entity.price = event.params.price;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  newActiveItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );
  newActiveItem.seller = event.params.seller;
  newActiveItem.nftAddress = event.params.nftContractAddr;
  newActiveItem.tokenId = event.params.tokenId;
  newActiveItem.price = event.params.price;
  newActiveItem.votes = new BigInt(0);

  entity.save();
  newActiveItem.save();
}

export function handleVoteOnNft(event: VoteOnNftEvent): void {
  let entity = new VoteOnNft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let activeItem = ActiveItem.load(
    getId(event.params.tokenId, event.params.nftContractAddr.toString())
  );

  entity.nftContractAddr = event.params.nftContractAddr;
  entity.tokenId = event.params.tokenId;
  entity.totalVote = event.params.totalVote;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  activeItem!.votes = activeItem!.votes!.plus(new BigInt(1));

  entity.save();
  activeItem!.save();
}

function getId(id: BigInt, nftAddr: string): string {
  return id.toHexString() + nftAddr;
}
