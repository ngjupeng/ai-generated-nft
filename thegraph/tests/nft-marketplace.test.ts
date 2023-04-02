import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CancelListing } from "../generated/schema"
import { CancelListing as CancelListingEvent } from "../generated/NFTMarketplace/NFTMarketplace"
import { handleCancelListing } from "../src/nft-marketplace"
import { createCancelListingEvent } from "./nft-marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let nftContractAddr = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let newCancelListingEvent = createCancelListingEvent(
      nftContractAddr,
      tokenId
    )
    handleCancelListing(newCancelListingEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CancelListing created and stored", () => {
    assert.entityCount("CancelListing", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CancelListing",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftContractAddr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CancelListing",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
