import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { deployments, ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { NFTMarketplace, AINFT } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFTMarketplace.test Unit Test", function () {
          let deployer: SignerWithAddress
          let player: SignerWithAddress
          let accounts: SignerWithAddress[]
          let nftMarketplace: NFTMarketplace
          let ainft: AINFT

          beforeEach(async () => {
              await deployments.fixture(["all"])
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              player = accounts[1]
              nftMarketplace = await ethers.getContract("NFTMarketplace")
              ainft = await ethers.getContract("AINFT")
          })

          describe("sellNft", function () {
              beforeEach(async () => {
                  const mintNftTx = await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: ethers.utils.parseEther("0.5"),
                      }
                  )
                  await mintNftTx.wait()
              })
              it("should revert if not the owner of the nft", async () => {
                  expect(
                      nftMarketplace
                          .connect(player)
                          .sellNft(
                              ainft.address,
                              "1",
                              ethers.utils.parseEther("0.01")
                          )
                  ).to.be.revertedWithCustomError(
                      nftMarketplace,
                      "NFTMarketplace__NotOwnerOfNFT"
                  )
              })
              it("should revert if the seller does not approved on the marketplace", async () => {
                  expect(
                      nftMarketplace.sellNft(
                          ainft.address,
                          "1",
                          ethers.utils.parseEther("0.01")
                      )
                  ).to.be.revertedWithCustomError(
                      nftMarketplace,
                      "NFTMarketplace__NFTNotApproved"
                  )
              })
              it("should list nft successfully", async () => {
                  const approveTx = await ainft.approve(
                      nftMarketplace.address,
                      "1"
                  )
                  await approveTx.wait()
                  const sellNftTx = await nftMarketplace.sellNft(
                      ainft.address,
                      "1",
                      ethers.utils.parseEther("0.1")
                  )
                  await sellNftTx.wait()

                  const { seller, nftContractAddr, tokenId, price } =
                      await nftMarketplace.getListedItem(ainft.address, "1")

                  assert.equal(seller, deployer.address)
                  assert.equal(nftContractAddr, ainft.address)
                  assert.equal(tokenId.toString(), "1")
                  assert.equal(
                      price.toString(),
                      ethers.utils.parseEther("0.1").toString()
                  )
              })
              it("should revert if the nft is already listed on the marketplace", async () => {
                  const approveTx = await ainft.approve(
                      nftMarketplace.address,
                      "1"
                  )
                  await approveTx.wait()
                  const sellNftTx = await nftMarketplace.sellNft(
                      ainft.address,
                      "1",
                      ethers.utils.parseEther("0.1")
                  )
                  await sellNftTx.wait()

                  expect(
                      nftMarketplace.sellNft(
                          ainft.address,
                          "1",
                          ethers.utils.parseEther("0.5")
                      )
                  ).to.be.revertedWithCustomError(
                      nftMarketplace,
                      "NFTMarketplace__NFTListedAlready"
                  )
              })
          })

          describe("upadteNftSellingState", function () {
              beforeEach(async () => {
                  const mintNftTx = await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: ethers.utils.parseEther("0.5"),
                      }
                  )
                  await mintNftTx.wait()
              })
              it("should revert if the nft not listed on the marketplace yet", async () => {
                  expect(
                      nftMarketplace.upadteNftSellingState(
                          ainft.address,
                          "1",
                          ethers.utils.parseEther("1")
                      )
                  ).to.be.revertedWithCustomError(
                      nftMarketplace,
                      "NFTMarketplace__NFTNotListedYet"
                  )
              })
              it("should update the listed item successfully", async () => {
                  const approveTx = await ainft.approve(
                      nftMarketplace.address,
                      "1"
                  )
                  await approveTx.wait()
                  const sellNftTx = await nftMarketplace.sellNft(
                      ainft.address,
                      "1",
                      ethers.utils.parseEther("0.1")
                  )
                  await sellNftTx.wait()

                  const updateSellingTx =
                      await nftMarketplace.upadteNftSellingState(
                          ainft.address,
                          "1",
                          ethers.utils.parseEther("1")
                      )
                  await updateSellingTx.wait()

                  const { price } = await nftMarketplace.getListedItem(
                      ainft.address,
                      "1"
                  )
                  assert.equal(
                      price.toString(),
                      ethers.utils.parseEther("1").toString()
                  )
              })
          })

          describe("buyNft", function () {
              beforeEach(async () => {
                  const mintNftTx = await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: ethers.utils.parseEther("0.5"),
                      }
                  )
                  await mintNftTx.wait()
              })
              describe("have nft listed on marketplace", function () {
                  beforeEach(async () => {
                      const approveTx = await ainft.approve(
                          nftMarketplace.address,
                          "1"
                      )
                      await approveTx.wait()
                      const sellNftTx = await nftMarketplace.sellNft(
                          ainft.address,
                          "1",
                          ethers.utils.parseEther("0.1")
                      )
                      await sellNftTx.wait()
                  })
                  it("should revert if the pay amount is not sufficient", async () => {
                      expect(
                          nftMarketplace.buyNft(ainft.address, "1", {
                              value: ethers.utils.parseEther("0.01"),
                          })
                      ).to.be.revertedWithCustomError(
                          nftMarketplace,
                          "NFTMarketplace__InsufficientAmountToBuyNft"
                      )
                  })
                  it("should transfer successfully if the paid amount is sufficient", async () => {
                      const originalOwnerOfNft = await ainft.ownerOf("1")

                      const buyNftTx = await nftMarketplace
                          .connect(player)
                          .buyNft(ainft.address, "1", {
                              value: ethers.utils.parseEther("0.1"),
                          })
                      await buyNftTx.wait()

                      const ownerOfNftNow = await ainft.ownerOf("1")

                      assert.equal(originalOwnerOfNft, deployer.address)
                      assert.equal(ownerOfNftNow, player.address)
                  })
                  it("the seller earned amount should increase", async () => {
                      const buyNftTx = await nftMarketplace
                          .connect(player)
                          .buyNft(ainft.address, "1", {
                              value: ethers.utils.parseEther("0.1"),
                          })
                      await buyNftTx.wait()

                      const amountEarned = await nftMarketplace.getSellerEarned(
                          deployer.address
                      )

                      assert.equal(
                          amountEarned.toString(),
                          ethers.utils.parseEther("0.1").toString()
                      )
                  })
                  it("the sold nft should be clear from the marketplace", async () => {
                      const buyNftTx = await nftMarketplace
                          .connect(player)
                          .buyNft(ainft.address, "1", {
                              value: ethers.utils.parseEther("0.1"),
                          })
                      await buyNftTx.wait()

                      const { seller, price } =
                          await nftMarketplace.getListedItem(ainft.address, "1")

                      assert.equal(
                          seller.toString(),
                          "0x0000000000000000000000000000000000000000"
                      )
                      assert.equal(price.toString(), "0")
                  })
              })
              it("should revert if the nft not listed yet", async () => {
                  expect(
                      nftMarketplace.buyNft(ainft.address, "1", {
                          value: ethers.utils.parseEther("1"),
                      })
                  ).to.be.revertedWithCustomError(
                      nftMarketplace,
                      "NFTMarketplace__NFTNotListedYet"
                  )
              })
          })

          describe("cancelListing", function () {
              beforeEach(async () => {
                  const mintNftTx = await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: ethers.utils.parseEther("0.5"),
                      }
                  )
                  await mintNftTx.wait()

                  const approveTx = await ainft.approve(
                      nftMarketplace.address,
                      "1"
                  )
                  await approveTx.wait()
                  const sellNftTx = await nftMarketplace.sellNft(
                      ainft.address,
                      "1",
                      ethers.utils.parseEther("0.1")
                  )
                  await sellNftTx.wait()
              })

              it("should cancel the listing successfully", async () => {
                  const cancelListingTx = await nftMarketplace.cancelListing(
                      ainft.address,
                      "1"
                  )
                  await cancelListingTx.wait()

                  const { seller, price } = await nftMarketplace.getListedItem(
                      ainft.address,
                      "1"
                  )

                  assert.equal(
                      seller.toString(),
                      "0x0000000000000000000000000000000000000000"
                  )
                  assert.equal(price.toString(), "0")
              })
          })

          describe("voteOnNft", function () {
              beforeEach(async () => {
                  const mintNftTx = await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: ethers.utils.parseEther("0.5"),
                      }
                  )
                  await mintNftTx.wait()

                  const approveTx = await ainft.approve(
                      nftMarketplace.address,
                      "1"
                  )
                  await approveTx.wait()
                  const sellNftTx = await nftMarketplace.sellNft(
                      ainft.address,
                      "1",
                      ethers.utils.parseEther("0.1")
                  )
                  await sellNftTx.wait()

                  const voteTx = await nftMarketplace.voteOnNft(
                      ainft.address,
                      "1"
                  )
                  await voteTx.wait()

                  const likes = await nftMarketplace.getListedNftLikes(
                      ainft.address,
                      "1"
                  )

                  assert.equal(likes.toString(), "1")
              })
          })

          describe("withdrawEarned", function () {
              beforeEach(async () => {
                  const mintNftTx = await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: ethers.utils.parseEther("0.5"),
                      }
                  )
                  await mintNftTx.wait()

                  const approveTx = await ainft.approve(
                      nftMarketplace.address,
                      "1"
                  )
                  await approveTx.wait()
                  const sellNftTx = await nftMarketplace.sellNft(
                      ainft.address,
                      "1",
                      ethers.utils.parseEther("0.1")
                  )
                  await sellNftTx.wait()
              })

              it("after sold the listed nft, the selelr should be able to withdraw the funds", async () => {
                  const buyTx = await nftMarketplace.buyNft(
                      ainft.address,
                      "1",
                      {
                          value: ethers.utils.parseEther("0.1"),
                      }
                  )
                  await buyTx.wait()

                  const ownerBalanceNow =
                      await nftMarketplace.provider.getBalance(deployer.address)

                  const withdrawTx = await nftMarketplace.withdrawEarned()
                  const { gasUsed, effectiveGasPrice } = await withdrawTx.wait()

                  const ownerBalanceAfter =
                      await nftMarketplace.provider.getBalance(deployer.address)

                  assert.equal(
                      ownerBalanceNow
                          .add(ethers.utils.parseEther("0.1"))
                          .toString(),
                      ownerBalanceAfter
                          .add(gasUsed.mul(effectiveGasPrice))
                          .toString()
                  )
              })
          })
      })
