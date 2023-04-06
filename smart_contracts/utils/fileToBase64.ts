import fs from "fs"

async function fileToBase64(buffer: Buffer) {
    const filePath = "nft.jpg"
    await fs.promises.writeFile(filePath, buffer)
    const fileContent = await fs.promises.readFile(filePath)
    return Buffer.from(fileContent).toString("base64")
}

export { fileToBase64 }
