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
          let accounts: SignerWithAddress[]
          beforeEach(async () => {
              await deployments.fixture(["all"])
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              ainft = await ethers.getContract("AINFT")
              mockV3aggregator = await ethers.getContract("MockV3Aggregator")
          })

          describe("constructor", function () {
              it("initialize the name and symbol correctly", async () => {
                  const ainftName = await ainft.name()
                  const ainftSymbol = await ainft.symbol()

                  assert.equal(ainftName, NFT_NAME)
                  assert.equal(ainftSymbol, NFT_SYMBOL)
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
