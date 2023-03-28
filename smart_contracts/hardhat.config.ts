import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-gas-reporter"
import "hardhat-deploy"
import dotenv from "dotenv"

dotenv.config()

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.6.5",
            },
            {
                version: "0.8.9",
            },
            {
                version: "0.8.18",
            },
        ],
    },
    paths: ["./node_modules/@openzeppelin/contracts"],
    networks: {
        hardhat: {
            chainId: 31337,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        // token: "MATIC",
    },
    mocha: {
        timeout: 400000,
    },
}

export default config
