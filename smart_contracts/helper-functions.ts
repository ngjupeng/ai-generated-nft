import { run } from "hardhat"

export const verify = async (contractAddress: string, args: any[]) => {
    try {
        console.log(`Verifying ${contractAddress}`)
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log(`Verified ${contractAddress}`)
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}
