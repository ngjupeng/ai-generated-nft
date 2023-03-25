const { ethers } = require("hardhat")

export interface networkConfigItem {
    blockConfirmations: number
    ethUsdPriceFeed?: string
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        blockConfirmations: 1,
    },
    11155111: {
        blockConfirmations: 5,
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
}

export const developmentChains = ["hardhat", "localhost"]
