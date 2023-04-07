import { ethers } from "hardhat"
import { NFTAuction, AINFT } from "../typechain-types"

const TOKEN_URI =
    "https://ipfs.io/ipfs/bafyreiegs4sv64wybzwtjzmixbatrbklyf5qjf6wr6kttwdwilvohjblru/metadata.json"

async function main() {
    const nft: AINFT = await ethers.getContract("AINFT")
    const auction: NFTAuction = await ethers.getContract("NFTAuction")

    const auctionAddressFronNFT = await nft.getAuctionContractAddress()
    if (auctionAddressFronNFT != auction.address) {
        console.log("Set auction contract...")
        await nft.setAuctionContract(auction.address)
    }
    const tx = await auction.startAuction(TOKEN_URI)
    const txReceipt = tx.wait()
    console.log((await txReceipt).transactionHash)

    const currentAuction = await auction.getCurrentAuction()
    console.log(currentAuction)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
