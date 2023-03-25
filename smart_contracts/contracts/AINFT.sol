// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 *  all the user can vote on the NFT for the design etc, for limited edition nft, it will be held by auctions, so only the highest value can own this, and for normal nft, everyone can mint one with just some fee, and at the end, they can buy/sell the nft
 *
 * Smart contract-based auctions: You can implement a smart contract-based auction system, where buyers can bid on the NFTs and the highest bidder gets the NFT. This feature can create a competitive bidding environment and potentially increase the value of the NFT.
 * Limited edition NFTs: You can create limited edition NFTs with unique features that are only available to a select number of buyers. This feature can increase the rarity and value of the NFT.
 * Community voting: You can allow the community to vote on certain aspects of the NFT, such as the design or features. This feature can increase community involvement and ownership of the NFT.
 *
 */

error AINFT__WithdrawFundFailed();

contract AINFT is ERC721URIStorage, Ownable {}
