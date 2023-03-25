const { ethers } = require("hardhat")

const networkConfig = {
    31337: {
        blockConfirmations: 1,
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
}
