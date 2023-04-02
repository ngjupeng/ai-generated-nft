import {
  AuctionEnd as AuctionEndEvent,
  NewAuctionStart as NewAuctionStartEvent,
  NewHighestBidder as NewHighestBidderEvent,
  NFTAuctionOwnershipTransferred as NFTAuctionOwnershipTransferredEvent
} from "../generated/NFTAuction/NFTAuction"
import {
  AuctionEnd,
  NewAuctionStart,
  NewHighestBidder,
  NFTAuctionOwnershipTransferred
} from "../generated/schema"

export function handleAuctionEnd(event: AuctionEndEvent): void {
  let entity = new AuctionEnd(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.winner = event.params.winner
  entity.tokenId = event.params.tokenId
  entity.amounBid = event.params.amounBid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewAuctionStart(event: NewAuctionStartEvent): void {
  let entity = new NewAuctionStart(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAuction_startTimestamp = event.params.newAuction.startTimestamp
  entity.newAuction_endTimestamp = event.params.newAuction.endTimestamp
  entity.newAuction_tokenId = event.params.newAuction.tokenId
  entity.newAuction_highestBidder = event.params.newAuction.highestBidder
  entity.newAuction_highestBidAmount = event.params.newAuction.highestBidAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewHighestBidder(event: NewHighestBidderEvent): void {
  let entity = new NewHighestBidder(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.bidder = event.params.bidder
  entity.previousBidder = event.params.previousBidder
  entity.auction_startTimestamp = event.params.auction.startTimestamp
  entity.auction_endTimestamp = event.params.auction.endTimestamp
  entity.auction_tokenId = event.params.auction.tokenId
  entity.auction_highestBidder = event.params.auction.highestBidder
  entity.auction_highestBidAmount = event.params.auction.highestBidAmount
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTAuctionOwnershipTransferred(
  event: NFTAuctionOwnershipTransferredEvent
): void {
  let entity = new NFTAuctionOwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
