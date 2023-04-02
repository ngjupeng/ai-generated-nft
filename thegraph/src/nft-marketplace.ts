import {
  CancelListing as CancelListingEvent,
  NFTSold as NFTSoldEvent,
  NewNFTItemListed as NewNFTItemListedEvent,
  NFTMarketplaceOwnershipTransferred as NFTMarketplaceOwnershipTransferredEvent,
  VoteOnNft as VoteOnNftEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import {
  CancelListing,
  NFTSold,
  NewNFTItemListed,
  NFTMarketplaceOwnershipTransferred,
  VoteOnNft
} from "../generated/schema"

export function handleCancelListing(event: CancelListingEvent): void {
  let entity = new CancelListing(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContractAddr = event.params.nftContractAddr
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTSold(event: NFTSoldEvent): void {
  let entity = new NFTSold(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.nftContractAddr = event.params.nftContractAddr
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewNFTItemListed(event: NewNFTItemListedEvent): void {
  let entity = new NewNFTItemListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.nftContractAddr = event.params.nftContractAddr
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTMarketplaceOwnershipTransferred(
  event: NFTMarketplaceOwnershipTransferredEvent
): void {
  let entity = new NFTMarketplaceOwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteOnNft(event: VoteOnNftEvent): void {
  let entity = new VoteOnNft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContractAddr = event.params.nftContractAddr
  entity.tokenId = event.params.tokenId
  entity.totalVote = event.params.totalVote

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
