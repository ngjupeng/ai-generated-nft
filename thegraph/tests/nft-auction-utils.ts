import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AuctionEnd,
  NewAuctionStart,
  NewHighestBidder,
  NFTAuctionOwnershipTransferred
} from "../generated/NFTAuction/NFTAuction"

export function createAuctionEndEvent(
  winner: Address,
  tokenId: BigInt,
  amounBid: BigInt
): AuctionEnd {
  let auctionEndEvent = changetype<AuctionEnd>(newMockEvent())

  auctionEndEvent.parameters = new Array()

  auctionEndEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  auctionEndEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionEndEvent.parameters.push(
    new ethereum.EventParam(
      "amounBid",
      ethereum.Value.fromUnsignedBigInt(amounBid)
    )
  )

  return auctionEndEvent
}

export function createNewAuctionStartEvent(
  newAuction: ethereum.Tuple
): NewAuctionStart {
  let newAuctionStartEvent = changetype<NewAuctionStart>(newMockEvent())

  newAuctionStartEvent.parameters = new Array()

  newAuctionStartEvent.parameters.push(
    new ethereum.EventParam("newAuction", ethereum.Value.fromTuple(newAuction))
  )

  return newAuctionStartEvent
}

export function createNewHighestBidderEvent(
  bidder: Address,
  previousBidder: Address,
  auction: ethereum.Tuple,
  amount: BigInt
): NewHighestBidder {
  let newHighestBidderEvent = changetype<NewHighestBidder>(newMockEvent())

  newHighestBidderEvent.parameters = new Array()

  newHighestBidderEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  newHighestBidderEvent.parameters.push(
    new ethereum.EventParam(
      "previousBidder",
      ethereum.Value.fromAddress(previousBidder)
    )
  )
  newHighestBidderEvent.parameters.push(
    new ethereum.EventParam("auction", ethereum.Value.fromTuple(auction))
  )
  newHighestBidderEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return newHighestBidderEvent
}

export function createNFTAuctionOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): NFTAuctionOwnershipTransferred {
  let nftAuctionOwnershipTransferredEvent = changetype<
    NFTAuctionOwnershipTransferred
  >(newMockEvent())

  nftAuctionOwnershipTransferredEvent.parameters = new Array()

  nftAuctionOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  nftAuctionOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return nftAuctionOwnershipTransferredEvent
}
