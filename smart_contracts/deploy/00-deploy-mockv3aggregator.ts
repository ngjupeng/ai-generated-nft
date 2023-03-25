import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains, networkConfig } from "../helper-hardhat-config"

// Non-ETH pairs: 8 decimals
// ETH pairs: 18 Decimals
const DECIMALS = 8
const INITIAL_ANSWER = "175120000000" //1751 usd

const deployMockV3Aggregator: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainName = network.name
    const chainId = network.config.chainId

    const waitBlockConfirmation = networkConfig[chainId!]["blockConfirmations"]

    log("----------------------------------------------")

    // only deploy on development mode
    if (developmentChains.includes(chainName)) {
        // uint8 _decimals,
        // int256 _initialAnswer
        const args: any[] = [DECIMALS, INITIAL_ANSWER]
        const mockV3Aggregator = await deploy("MockV3Aggregator", {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: waitBlockConfirmation,
        })
    }
}

export default deployMockV3Aggregator
deployMockV3Aggregator.tags = ["all", "mocks", "v3aggregator"]
