import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { deployments, ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { AINFT, MockV3Aggregator } from "../../typechain-types"

const NFT_NAME = "AI NFT"
const NFT_SYMBOL = "AIT"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("AINFT Unit Test", function () {
          const INITIAL_ANSWER = "175120000000"
          let ainft: AINFT
          let mockV3aggregator: MockV3Aggregator
          let deployer: SignerWithAddress
          let player: SignerWithAddress
          let auction: SignerWithAddress // mimic the auction contract
          let accounts: SignerWithAddress[]

          beforeEach(async () => {
              await deployments.fixture(["all"])
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              player = accounts[1]
              auction = accounts[2]
              ainft = await ethers.getContract("AINFT")
              mockV3aggregator = await ethers.getContract("MockV3Aggregator")
          })

          describe("constructor", function () {
              it("initialize the name and symbol correctly", async () => {
                  const ainftName = await ainft.name()
                  const ainftSymbol = await ainft.symbol()
                  const minimumUSDAmount = await ainft.getMinimumUSDAmount()
                  const tokenCounter = await ainft.getTokenCounter()
                  const limitedTokenCounter =
                      await ainft.getLimitedTokenCounter()
                  const maximumLimitedTokenSupply =
                      await ainft.getMaximumLimitedTokenSupply()
                  const isDeployerBeAuthorized = await ainft.isUserAuthorized(
                      deployer.address
                  )

                  assert.equal(ainftName, NFT_NAME)
                  assert.equal(ainftSymbol, NFT_SYMBOL)
                  assert.equal(
                      minimumUSDAmount.toString(),
                      ethers.utils.parseEther("10").toString()
                  )
                  assert.equal(tokenCounter.toString(), "0")
                  assert.equal(limitedTokenCounter.toString(), "0")
                  assert.equal(maximumLimitedTokenSupply.toString(), "100")
                  assert.equal(isDeployerBeAuthorized.toString(), "true")
              })
          })

          describe("mintNft", function () {
              it("Should revert when insufficient fund.", async () => {
                  await expect(
                      ainft.mintNft(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                      )
                  ).to.be.revertedWithCustomError(
                      ainft,
                      "AINFT__InSufficientFund"
                  )
              })
              it("Mint NFT when enough sufficient", async () => {
                  const mintTx = await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: ethers.utils.parseEther("0.02855185016"),
                      }
                  )
                  const mintReceipt = await mintTx.wait()

                  const tokenCounter = await ainft.getTokenCounter()
                  const ownerOfNFT = await ainft.ownerOf(
                      tokenCounter.toString()
                  )

                  assert.equal(tokenCounter.toString(), "1")
                  assert.equal(ownerOfNFT.toString(), deployer.address)
              })
              it("Emit minted event when mintend NFT success", async () => {
                  expect(
                      ainft.mintNft(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                          {
                              value: ethers.utils.parseEther("0.02855185016"),
                          }
                      )
                  ).to.emit(ainft, "MintedNewNFT")
              })
          })

          describe("mintLimitedEditionNft", function () {
              beforeEach(async () => {
                  await ainft.setAuctionContract(auction.address)
              })

              it("Should revert if unauthorized", async () => {
                  await expect(
                      ainft
                          .connect(player)
                          .mintLimitedEditionNft(
                              "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                          )
                  ).to.be.revertedWithCustomError(ainft, "AINFT__Unauthorized")
              })
              it("it should successfully minted a limited edition nft if limited token counter does not exceed maximum supply", async () => {
                  const tx = await ainft.mintLimitedEditionNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                  )
                  const txReceipt = await tx.wait()
                  const tokenCounter = await ainft.getTokenCounter()
                  const limitedTokenCounter =
                      await ainft.getLimitedTokenCounter()
                  const isLimitedToken = await ainft.isLimitedEditionNft(
                      limitedTokenCounter
                  )

                  assert.equal(tokenCounter.toString(), "1")
                  assert.equal(limitedTokenCounter.toString(), "1")
                  assert.equal(isLimitedToken.toString(), "true")
              })
              it("it should return the limited token counter correctly", async () => {
                  const limitedTokenCounter =
                      await ainft.callStatic.mintLimitedEditionNft(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                      )
                  assert.equal(limitedTokenCounter.toString(), "1")
              })
              it("the limited edition nft owner should be auction contract", async () => {
                  const tx = await ainft.mintLimitedEditionNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                  )
                  await tx.wait()
                  const limitedTokenCounter =
                      await ainft.getLimitedTokenCounter()

                  const owner = await ainft.ownerOf(limitedTokenCounter)
                  assert.equal(owner, auction.address)
              })
              it("should emit event when limited edition nft minted", async () => {
                  expect(
                      ainft.mintLimitedEditionNft(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                      )
                  ).to.emit(ainft, "MintedNewLimitedNFT")
              })
              it("should revert if limited token counter exceeds the maximum limited token supply", async () => {
                  const maximumSupply =
                      await ainft.getMaximumLimitedTokenSupply()
                  // mint 100 limited tokens
                  for (let i = 0; i < maximumSupply; i++) {
                      const tx = await ainft.mintLimitedEditionNft(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                      )
                      await tx.wait()
                  }
                  expect(
                      ainft.mintLimitedEditionNft(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"
                      )
                  ).to.be.revertedWithCustomError(
                      ainft,
                      "AINFT__ExceededMaxLimitedToken"
                  )
              })
          })

          describe("getLatestPrice", function () {
              it("the latest price should be equal to the initial answer passed into the mockV3aggregator", async () => {
                  const decimals = await mockV3aggregator.decimals()
                  const zeroAppend = 18 - decimals
                  const initialAnswerAppendedZeroes = ethers.utils
                      .parseUnits(INITIAL_ANSWER, zeroAppend)
                      .toString()

                  const initialAnswer = (
                      await ainft.getLatestPrice()
                  ).toString()
                  assert.equal(initialAnswer, initialAnswerAppendedZeroes)
              })
          })

          describe("withdraw", function () {
              it("owner should receive the fund from the contract", async () => {
                  const ownerAmountBefore = await deployer.getBalance()
                  const amount = ethers.utils.parseEther("0.5")
                  await ainft
                      .connect(player)
                      .mintNft(
                          "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                          {
                              value: amount,
                          }
                      )
                  const contractBalance = await ainft.provider.getBalance(
                      ainft.address
                  )
                  const tx = await ainft.withdraw()
                  const txReceipt = await tx.wait()
                  const { gasUsed, effectiveGasPrice } = txReceipt
                  const ownerAmountAfter = await deployer.getBalance()
                  assert.equal(
                      ownerAmountBefore.add(contractBalance).toString(),
                      ownerAmountAfter
                          .add(gasUsed.mul(effectiveGasPrice))
                          .toString()
                  )
              })
              it("should emit event when withdraw", async () => {
                  const amount = ethers.utils.parseEther("0.5")
                  await ainft.mintNft(
                      "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
                      {
                          value: amount,
                      }
                  )
                  expect(await ainft.withdraw()).to.emit(ainft, "WithdrawFund")
              })
              it("should revert if not the owner calling withdraw", async () => {
                  expect(ainft.connect(player).withdraw()).to.be.revertedWith(
                      "Ownable: caller is not the owner"
                  )
              })
          })

          describe("grantPermission", function () {
              it("should revert when the granted address is invalid", async () => {
                  expect(
                      ainft.grantPermission(
                          "0x0000000000000000000000000000000000000000"
                      )
                  ).to.be.revertedWithCustomError(
                      ainft,
                      "AINFT__InvalidAddress"
                  )
              })
              it("should grant permission successfully if the address is not granted yet", async () => {
                  const tx = await ainft.grantPermission(player.address)
                  await tx.wait()
                  const result = await ainft.isUserAuthorized(player.address)
                  assert.equal(result.toString(), "true")
              })
              it("should revert if the address is authorized already", async () => {
                  const tx = await ainft.grantPermission(player.address)
                  await tx.wait()
                  expect(ainft.grantPermission(player.address))
                      .to.be.revertedWithCustomError(
                          ainft,
                          "AINFT__AlreadyHavePermission"
                      )
                      .withArgs(player.address)
              })
              it("should emit an event when granted permission successfully", async () => {
                  expect(ainft.grantPermission(player.address)).to.emit(
                      ainft,
                      "GrantedPermission"
                  )
              })
          })

          describe("setAuctionContract", function () {
              it("should revert when the auction address is invalid", async () => {
                  expect(
                      ainft.setAuctionContract(
                          "0x0000000000000000000000000000000000000000"
                      )
                  ).to.be.revertedWithCustomError(
                      ainft,
                      "AINFT__InvalidAddress"
                  )
              })
              it("should set auction contract successfully ", async () => {
                  const tx = await ainft.setAuctionContract(auction.address)
                  await tx.wait()
                  const result = await ainft.getAuctionContractAddress()
                  assert.equal(result.toString(), auction.address)
              })
          })

          describe("ethToUSD", function () {
              it("check the conversion between eth and usd", async () => {
                  // first check whether 1 ETH equal to 1751.2 USD
                  const decimals = await mockV3aggregator.decimals()
                  const zeroAppend = 18 - decimals
                  const initialAnswerAppendedZeroes = ethers.utils
                      .parseUnits(INITIAL_ANSWER, zeroAppend)
                      .toString()

                  const oneEther = ethers.utils.parseEther("1").toString()
                  const oneEthInUSD = (
                      await ainft.ethToUSD(oneEther)
                  ).toString()
                  assert.equal(oneEthInUSD, initialAnswerAppendedZeroes)

                  // check 50 ETH in dollar
                  const fiftyDollar = (
                      await ainft.ethToUSD(ethers.utils.parseEther("50"))
                  ).toString()
                  assert.equal(
                      Number(ethers.utils.formatEther(fiftyDollar)).toFixed(0),
                      "87560"
                  )
              })
          })
      })
