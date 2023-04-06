import { task } from "hardhat/config"
import fs from "fs"
import axios from "axios"
import { fileToBase64 } from "../utils/fileToBase64"

export default task("start-auction", "Start an ai-generated nft auction")
    .addParam("description", "the description of the ai generated image")
    .setAction(async (taskArgs, hre) => {
        const description = taskArgs.description
        // TODO: generate image
        console.log("Generating image...")
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            description,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
                },
                responseType: "arraybuffer",
            }
        )
        console.log("Converting to base64 format...")
        const result = Buffer.from(response.data)
        const base64 = await fileToBase64(result)
        const base64Prefix = "data:image/png;base64," + base64
        await fs.promises.writeFile("./base64.txt", base64Prefix)
    })
