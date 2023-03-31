// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./AINFT.sol";

/**
 * Smart contract-based auctions: You can implement a smart contract-based auction system, where buyers can bid on the NFTs and the highest bidder gets the NFT. This feature can create a competitive bidding environment and potentially increase the value of the NFT.
 */

contract NFTAuction is Ownable, IERC721Receiver {
    enum AuctionState {
        CLOSED,
        RUNNING
    }

    struct Auction {
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 tokenId;
        address highestBidder;
        uint256 highestBidAmount;
    }

    uint256 private constant AUCTION_DURATION = 5 days;
    AINFT private immutable i_nftContract; // ainft contract

    AuctionState private s_currentState; // track the auction state
    uint256 private s_currentAuction; // track the current running auction
    Auction[] private s_auctions;

    // when the new highest bidder occured, the previous highest bidder should be able to withdraw the fund
    mapping(address => uint256) private s_bidderRefund;

    event NewAuctionStart(Auction newAuction);
    event NewHighestBidder(
        address indexed bidder,
        address indexed previousBidder,
        Auction auction,
        uint256 amount
    );
    event AuctionEnd();

    error NFTAuction__AuctionIsRunning();
    error NFTAuction__AuctionIsClosed();
    error NFTAuction__NotERC721Calling();

    modifier onlyFromERC721Contract() {
        if (msg.sender != address(i_nftContract)) {
            revert NFTAuction__NotERC721Calling();
        }
        _;
    }

    constructor(address payable _nftContract) {
        i_nftContract = AINFT(_nftContract);
        s_currentState = AuctionState.CLOSED;
    }

    /// @notice Only the contract owner can start a new auction
    /// @dev This will be automatically call by a script every x days
    /// @param _tokenUri ipfs metadata link
    function startAuction(string calldata _tokenUri) public onlyOwner {
        if (s_currentState != AuctionState.CLOSED) {
            revert NFTAuction__AuctionIsRunning();
        }
        // mint a new limited nft
        i_nftContract.mintLimitedEditionNft(_tokenUri);
    }

    /// @dev This function will call by the nft contract, since this is the contract therefore we need to implement onERC721Received otherwise the safeMint will fail
    /// @param tokenId the token id of the limited edition nft send back from nft contract
    function onERC721Received(
        address, /*operator*/
        address, /*from*/
        uint256 tokenId,
        bytes calldata /*data*/
    ) external onlyFromERC721Contract returns (bytes4) {
        s_currentState = AuctionState.RUNNING;
        Auction memory newAuction = Auction({
            startTimestamp: block.timestamp,
            endTimestamp: block.timestamp + AUCTION_DURATION,
            tokenId: tokenId,
            highestBidder: address(0),
            highestBidAmount: 0.01 ether
        });
        s_auctions.push(newAuction);
        emit NewAuctionStart(newAuction);
        return IERC721Receiver.onERC721Received.selector;
    }

    /// @notice Bid to the current running nft auction
    /// @dev If the new bidder arise, refund to the previous bidder
    function bidOnNft() public payable {
        if (s_currentState == AuctionState.CLOSED) {
            revert NFTAuction__AuctionIsClosed();
        }
        Auction memory currentAuction = getCurrentAuction();
        uint256 highestBidderAmount = currentAuction.highestBidAmount;

        if (msg.value > highestBidderAmount) {
            // update the highest bidder
            // pay back the previous highest bidder (pull over push)
            address previousBidder = currentAuction.highestBidder;
            s_bidderRefund[previousBidder] += highestBidderAmount;

            currentAuction.highestBidder = msg.sender;
            currentAuction.highestBidAmount = msg.value;

            s_auctions[s_currentAuction] = currentAuction;
            emit NewHighestBidder(
                msg.sender,
                previousBidder,
                currentAuction,
                msg.value
            );
        } else {
            // if the user does not beat the highest bidder, should track their fund and allow them to refund otherwise they will lose the fund
            s_bidderRefund[msg.sender] += msg.value;
        }
    }

    /// @notice This will end the current running auction
    /// @dev This will be keep check by the chainlink keeper to check when to end the auction
    function endAuction() public {}

    /// @notice Bidder can take back their fund if lose in the bid
    function withdrawBid() public {}

    /// @notice This allow the owner of the auction contract to take out the earned fund from auctions
    function withdraw() public onlyOwner {}

    /// @notice Get the current running auction that contains the starting/ending time, current highest bidder and amount
    function getCurrentAuction() public view returns (Auction memory) {
        return s_auctions[s_currentAuction];
    }

    /// @notice Get the amount of refundable amount of the bidder if they were beated or does not bid the highest bidder
    function getBidderRefundAmount(address _bidder)
        public
        view
        returns (uint256)
    {
        return s_bidderRefund[_bidder];
    }

    /// @notice Get the nft contract address that this auction contract is selling
    function getNftContract() public view returns (address) {
        return address(i_nftContract);
    }

    /// @notice Get the current state of the auction contract, it can be either running/closed
    function getAuctionState() public view returns (AuctionState) {
        return s_currentState;
    }

    /// @notice Get the duration of each auction will last for
    function getAuctionDuration() public pure returns (uint256) {
        return AUCTION_DURATION;
    }
}
