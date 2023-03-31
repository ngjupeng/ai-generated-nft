import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { deployments, ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { NFTAuction, AINFT } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFTAuction Unit Test", function () {
          let deployer: SignerWithAddress
          let player: SignerWithAddress
          let accounts: SignerWithAddress[]
          let nftAuction: NFTAuction
          let aifnt: AINFT

          beforeEach(async () => {
              await deployments.fixture(["all"])
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              player = accounts[1]
              nftAuction = await ethers.getContract("NFTAuction")
              aifnt = await ethers.getContract("AINFT")
          })

          describe("consturctor", function () {
              it("constructor should initialized successfully", async () => {
                  // ai nft contract
                  const ainftContract = await ethers.getContract("AINFT")
                  const nftContractAddress = await nftAuction.getNftContract()

                  const auctionState = await nftAuction.getAuctionState()

                  assert.equal(nftContractAddress, ainftContract.address)
                  assert.equal(auctionState, 0)
              })
          })

          describe("startAuction", function () {
              beforeEach(async () => {
                  await aifnt.setAuctionContract(nftAuction.address)
              })
              it("should push the auction into the auction tracking array and switch the contract state to running", async () => {
                  let getAuctionState = await nftAuction.getAuctionState()

                  // before starting the auction, the state should be close
                  assert.equal(getAuctionState, 0)

                  const tx = await nftAuction
                      .connect(deployer)
                      .startAuction(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                      )
                  await tx.wait()

                  getAuctionState = await nftAuction.getAuctionState()

                  const {
                      startTimestamp,
                      endTimestamp,
                      tokenId,
                      highestBidder,
                      highestBidAmount,
                  } = await nftAuction.getCurrentAuction()
                  const currentTimestamp = (
                      await aifnt.provider.getBlock(
                          await aifnt.provider.getBlockNumber()
                      )
                  ).timestamp
                  const auctionEndingTimestamp =
                      60 * 60 * 24 * 5 + currentTimestamp

                  assert.equal(getAuctionState, 1)
                  assert.equal(
                      startTimestamp.toString(),
                      currentTimestamp.toString()
                  )
                  assert.equal(auctionEndingTimestamp, endTimestamp.toNumber())
                  assert.equal(tokenId.toString(), "1")
                  assert.equal(
                      highestBidder.toString(),
                      "0x0000000000000000000000000000000000000000"
                  )
                  assert.equal(
                      highestBidAmount.toString(),
                      ethers.utils.parseEther("0.01").toString()
                  )
              })
              it("should revert when the auction is running", async () => {
                  const tx = await nftAuction
                      .connect(deployer)
                      .startAuction(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                      )
                  await tx.wait()
                  expect(
                      nftAuction
                          .connect(deployer)
                          .startAuction(
                              "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                          )
                  ).to.be.revertedWithCustomError(
                      nftAuction,
                      "NFTAuction__AuctionIsRunning"
                  )
              })
              it("should emit an event when the new auction started", async () => {
                  expect(
                      nftAuction
                          .connect(deployer)
                          .startAuction(
                              "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                          )
                  ).to.emit(nftAuction, "NewAuctionStart")
              })

              it("should revert when not the deployer calling the startAuction function", async () => {
                  expect(
                      nftAuction
                          .connect(player)
                          .startAuction(
                              "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                          )
                  ).to.revertedWith("Ownable: caller is not the owner")
              })
              it("onERC721Received only can call by the nft contract, all the others who calling this should be reverted, even the deployer", async () => {
                  expect(
                      nftAuction.onERC721Received(
                          deployer.address,
                          deployer.address,
                          1,
                          ""
                      )
                  ).to.revertedWithCustomError(
                      nftAuction,
                      "NFTAuction__NotERC721Calling"
                  )
              })
          })

          describe("bidOnNft", function () {
              it("should revert if the auction is not running", async () => {
                  expect(
                      nftAuction.bidOnNft({
                          value: ethers.utils.parseEther("0.5"),
                      })
                  ).to.be.revertedWithCustomError(
                      nftAuction,
                      "NFTAuction__AuctionIsClosed"
                  )
              })
              describe("bidOnNft with started auction", function () {
                  beforeEach(async () => {
                      await aifnt.setAuctionContract(nftAuction.address)

                      const tx = await nftAuction
                          .connect(deployer)
                          .startAuction(
                              "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                          )
                      await tx.wait()
                  })

                  it("should become the highest bidder if it is the first bid", async () => {
                      const bidAmount = ethers.utils
                          .parseEther("0.5")
                          .toString()

                      const tx = await nftAuction.bidOnNft({
                          value: bidAmount,
                      })
                      await tx.wait()

                      const { highestBidder, highestBidAmount } =
                          await nftAuction.getCurrentAuction()

                      assert.equal(highestBidder.toString(), deployer.address)
                      assert.equal(highestBidAmount.toString(), bidAmount)
                  })

                  it("if new highest bidder occur, should update the bidder correctly", async () => {
                      const bidAmount = ethers.utils
                          .parseEther("0.5")
                          .toString()

                      let tx = await nftAuction.bidOnNft({
                          value: bidAmount,
                      })
                      await tx.wait()

                      const largerBidAmount = ethers.utils
                          .parseEther("1")
                          .toString()

                      tx = await nftAuction.connect(player).bidOnNft({
                          value: largerBidAmount,
                      })
                      await tx.wait()

                      const { highestBidder, highestBidAmount } =
                          await nftAuction.getCurrentAuction()

                      const refundAmountDeployer =
                          await nftAuction.getBidderRefundAmount(
                              deployer.address
                          )

                      const refundAmountPlayer =
                          await nftAuction.getBidderRefundAmount(player.address)

                      assert.equal(highestBidder, player.address)
                      assert.equal(highestBidAmount.toString(), largerBidAmount)
                      assert.equal(refundAmountDeployer.toString(), bidAmount)
                      assert.equal(refundAmountPlayer.toString(), "0")
                  })

                  it("if bidder does not beat the highest bidder, the bidder refund should increase", async () => {
                      const bidAmount = ethers.utils
                          .parseEther("0.5")
                          .toString()

                      let tx = await nftAuction.bidOnNft({
                          value: bidAmount,
                      })
                      await tx.wait()

                      const lowerBidAmount = ethers.utils.parseEther("0.1")
                      tx = await nftAuction
                          .connect(player)
                          .bidOnNft({ value: lowerBidAmount })
                      await tx.wait()

                      const playerRefundAmount =
                          await nftAuction.getBidderRefundAmount(player.address)
                      assert.equal(
                          playerRefundAmount.toString(),
                          lowerBidAmount.toString()
                      )
                  })
              })
          })
      })
