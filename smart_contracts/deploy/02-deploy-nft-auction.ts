import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains, networkConfig } from "../helper-hardhat-config"
import { verify } from "../helper-functions"
import { ethers } from "hardhat"

const deployNFTAuction: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainName = network.name
    const chainId = network.config.chainId

    const waitBlockConfirmation = networkConfig[chainId!]["blockConfirmations"]

    // get nft contract
    const ainft = await ethers.getContract("AINFT")

    const args: any[] = [ainft.address]
    const nftAuction = await deploy("NFTAuction", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmation,
    })

    if (
        !developmentChains.includes(chainName) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        verify(nftAuction.address, args)
    }
}

export default deployNFTAuction
deployNFTAuction.tags = ["all", "nftauction"]
