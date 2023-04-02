import { ethers } from "hardhat"
import { AINFT } from "../typechain-types"

async function main() {
    const nft: AINFT = await ethers.getContract("AINFT")

    console.log("Minting nft...")
    const mintTx = await nft.mintNft("xxxxxxx", {
        value: ethers.utils.parseEther("0.5"),
    })
    const mintReceipt = await mintTx.wait()

    console.log(`Token id: ${mintReceipt.events?.[1]?.args?.tokenId}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
