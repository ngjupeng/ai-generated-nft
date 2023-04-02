import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains, networkConfig } from "../helper-hardhat-config"
import { verify } from "../helper-functions"
import { ethers } from "hardhat"

const deployNFTMarketplace: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainName = network.name
    const chainId = network.config.chainId

    const waitBlockConfirmation = networkConfig[chainId!]["blockConfirmations"]

    const args: any[] = []
    const nftMarketplace = await deploy("NFTMarketplace", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmation,
    })

    if (
        !developmentChains.includes(chainName) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(nftMarketplace.address, args)
    }
}

export default deployNFTMarketplace
deployNFTMarketplace.tags = ["all", "nftmarketplace"]
