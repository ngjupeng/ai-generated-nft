import fs from "fs"
import { File, NFTStorage } from "nft.storage"

const NAME = "Limited Edition NFT 1"
const DESCRIPTION = "This is one of the limited edition nft"

async function main() {
    console.log("Uploading to IPFS...")
    const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN || "your token here"
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
    // TODO: upload to ipfs
    // TODO: mint a limited edition nft and pass in the ipfs metadata
    const fileContent = await fs.promises.readFile("./base64.txt")
    const imageFile = new File([fileContent], "nft.png", {
        type: "image/png",
    })
    const metadata = await client.store({
        name: NAME,
        description: DESCRIPTION,
        image: imageFile,
    })
    const content = `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`
    fs.appendFile("./limited-edition-nfts-metadata.txt", content, (err) => {
        return console.log(err)
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
