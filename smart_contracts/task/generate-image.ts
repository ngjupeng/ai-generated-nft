import { task } from "hardhat/config"
import { uploadToIPFS } from "../utils/uploadToIPFS"

const NAME = "Limited Edition NFT 1"

export default task("generate-image", "Start an ai-generated nft auction")
    .addParam("description", "the description of the ai generated image")
    .setAction(async (taskArgs, hre) => {
        const description = taskArgs.description
        // TODO: generate image
        console.log("Generating image...")
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
                },
                method: "POST",
                body: JSON.stringify(description),
            }
        )
        const result = await response.blob()
        const metadata = await uploadToIPFS(result, NAME, description)
        console.log(`Metadata: ${metadata}`)
    })
