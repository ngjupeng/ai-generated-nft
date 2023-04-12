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
    5: {
        blockConfirmations: 5,
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    80001: {
        blockConfirmations: 5,
        ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    },
}

export const developmentChains = ["hardhat", "localhost"]
