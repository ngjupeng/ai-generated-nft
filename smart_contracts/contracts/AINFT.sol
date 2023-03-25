// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 *  all the user can vote on the NFT for the design etc, for limited edition nft, it will be held by auctions, so only the highest value can own this, and for normal nft, everyone can mint one with just some fee, and at the end, they can buy/sell the nft
 *
 * Smart contract-based auctions: You can implement a smart contract-based auction system, where buyers can bid on the NFTs and the highest bidder gets the NFT. This feature can create a competitive bidding environment and potentially increase the value of the NFT.
 * Limited edition NFTs: You can create limited edition NFTs with unique features that are only available to a select number of buyers. This feature can increase the rarity and value of the NFT.
 * Community voting: You can allow the community to vote on certain aspects of the NFT, such as the design or features. This feature can increase community involvement and ownership of the NFT.
 *
 */

error AINFT__WithdrawFundFailed();

contract AINFT is ERC721URIStorage, Ownable {
    AggregatorV3Interface internal s_priceFeed;
    uint256 public s_tokenCounter;

    constructor(
        string memory _name,
        string memory _symbol,
        address _priceFeed
    ) ERC721(_name, _symbol) {
        s_priceFeed = AggregatorV3Interface(_priceFeed);
    }

    /// @notice Mint a NFT
    /// @dev Store the NFT tokenID according to the caller
    /// @param _tokenURI the token URI that contain the pointer to the AI generated image and also metadata
    function mintNft(string calldata _tokenURI) public payable {}

    function withdraw() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        if (!success) {
            revert AINFT__WithdrawFundFailed();
        }
    }

    /// @notice Read the price of ETH in USD
    /// @return Return the price of ETH in USD
    function getLatestPrice() public view returns (uint256) {
        uint8 decimals = s_priceFeed.decimals();
        (, int256 price, , , ) = s_priceFeed.latestRoundData();
        return uint256(price * int256(10**(18 - decimals)));
    }

    function ethToUSD(uint256 _ethAmount) public view returns (uint256) {
        uint256 ethLatestPrice = getLatestPrice();
        uint256 ethAmountInUSD = (_ethAmount * ethLatestPrice) / (10**18);
        return ethAmountInUSD;
    }
}
