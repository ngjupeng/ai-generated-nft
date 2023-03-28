import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains, networkConfig } from "../helper-hardhat-config"
import { verify } from "../helper-functions"
import { ethers } from "hardhat"
import { MockV3Aggregator } from "../typechain-types"

const NFT_NAME = "AI NFT"
const NFT_SYMBOL = "AIT"

const deployAINFT: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainName = network.name
    const chainId = network.config.chainId

    const waitBlockConfirmation = networkConfig[chainId!]["blockConfirmations"]

    log("----------------------------------------------")

    let mockV3Aggregator: string

    // if local deployment, get the mockV3aggregator contract address
    // if on testnet, get the mockV3aggregator contract address from helper file
    if (developmentChains.includes(chainName)) {
        // in local deployment
        mockV3Aggregator = (await ethers.getContract("MockV3Aggregator"))
            .address
    } else {
        mockV3Aggregator = networkConfig[chainId!]["ethUsdPriceFeed"]!
    }
    const args: any[] = [NFT_NAME, NFT_SYMBOL, mockV3Aggregator, 10]
    const ainft = await deploy("AINFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmation,
    })

    if (
        !developmentChains.includes(chainName) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        verify(ainft.address, args)
    }
}

export default deployAINFT
deployAINFT.tags = ["all", "ainft"]
