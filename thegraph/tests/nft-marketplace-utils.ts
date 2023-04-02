import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CancelListing,
  NFTSold,
  NewNFTItemListed,
  NFTMarketplaceOwnershipTransferred,
  VoteOnNft
} from "../generated/NFTMarketplace/NFTMarketplace"

export function createCancelListingEvent(
  nftContractAddr: Address,
  tokenId: BigInt
): CancelListing {
  let cancelListingEvent = changetype<CancelListing>(newMockEvent())

  cancelListingEvent.parameters = new Array()

  cancelListingEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddr",
      ethereum.Value.fromAddress(nftContractAddr)
    )
  )
  cancelListingEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return cancelListingEvent
}

export function createNFTSoldEvent(
  buyer: Address,
  nftContractAddr: Address,
  tokenId: BigInt,
  price: BigInt
): NFTSold {
  let nftSoldEvent = changetype<NFTSold>(newMockEvent())

  nftSoldEvent.parameters = new Array()

  nftSoldEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddr",
      ethereum.Value.fromAddress(nftContractAddr)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftSoldEvent
}

export function createNewNFTItemListedEvent(
  seller: Address,
  nftContractAddr: Address,
  tokenId: BigInt,
  price: BigInt
): NewNFTItemListed {
  let newNftItemListedEvent = changetype<NewNFTItemListed>(newMockEvent())

  newNftItemListedEvent.parameters = new Array()

  newNftItemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  newNftItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddr",
      ethereum.Value.fromAddress(nftContractAddr)
    )
  )
  newNftItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  newNftItemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return newNftItemListedEvent
}

export function createNFTMarketplaceOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): NFTMarketplaceOwnershipTransferred {
  let nftMarketplaceOwnershipTransferredEvent = changetype<
    NFTMarketplaceOwnershipTransferred
  >(newMockEvent())

  nftMarketplaceOwnershipTransferredEvent.parameters = new Array()

  nftMarketplaceOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  nftMarketplaceOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return nftMarketplaceOwnershipTransferredEvent
}

export function createVoteOnNftEvent(
  nftContractAddr: Address,
  tokenId: BigInt,
  totalVote: BigInt
): VoteOnNft {
  let voteOnNftEvent = changetype<VoteOnNft>(newMockEvent())

  voteOnNftEvent.parameters = new Array()

  voteOnNftEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddr",
      ethereum.Value.fromAddress(nftContractAddr)
    )
  )
  voteOnNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  voteOnNftEvent.parameters.push(
    new ethereum.EventParam(
      "totalVote",
      ethereum.Value.fromUnsignedBigInt(totalVote)
    )
  )

  return voteOnNftEvent
}
