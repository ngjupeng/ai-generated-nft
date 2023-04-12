import { File, NFTStorage } from "nft.storage"

export async function uploadToIPFS(
    blob: Blob,
    name: string,
    description: string
) {
    console.log("Uploading to IPFS...")
    const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN || "your token here"
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
    const imageHash = await client.storeBlob(blob)

    const imageFile = new File([blob], "nft.png", {
        type: "image/png",
    })

    const metadata = await client.store({
        name: name,
        description: description,
        image: imageFile,
    })
    console.log("Uploaded to IPFS...")
    return metadata
}
