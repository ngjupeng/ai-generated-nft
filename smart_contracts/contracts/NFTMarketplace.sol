// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * Community voting: You can allow the community to vote on certain aspects of the NFT, such as the design or features. This feature can increase community involvement and ownership of the NFT.
 */

contract NFTMarketplace is Ownable {
    struct ListedItem {
        address seller;
        address nftContractAddr;
        uint256 tokenId;
        uint256 price;
    }

    mapping(address => mapping(uint256 => ListedItem)) private s_listedItems;
    mapping(address => mapping(uint256 => uint256)) private s_listedItemsVotes;
    mapping(address => uint256) private s_sellerEarned;

    event NewNFTItemListed(
        address indexed seller,
        address indexed nftContractAddr,
        uint256 indexed tokenId,
        uint256 price
    );
    event NFTSold(
        address indexed buyer,
        address indexed nftContractAddr,
        uint256 indexed tokenId,
        uint256 price
    );
    event CancelListing(
        address indexed nftContractAddr,
        uint256 indexed tokenId
    );
    event VoteOnNft(
        address indexed nftContractAddr,
        uint256 indexed tokenId,
        uint256 totalVote
    );

    error NFTMarketplace__NFTNotApproved();
    error NFTMarketplace__NFTListedAlready();
    error NFTMarketplace__NFTNotListedYet();
    error NFTMarketplace__NotOwnerOfNFT();
    error NFTMarketplace__InsufficientAmountToBuyNft();
    error NFTMarketplace__NothingToWithdraw();
    error NFTMarketplace__WithdrawFailed();

    modifier isNFTOwner(address _nftContractAddr, uint256 _tokenId) {
        address nftOwner = IERC721(_nftContractAddr).ownerOf(_tokenId);
        if (nftOwner != msg.sender) {
            revert NFTMarketplace__NotOwnerOfNFT();
        }
        _;
    }

    modifier onlyListedItem(address _nftContractAddr, uint256 _tokenId) {
        ListedItem memory listedItem = s_listedItems[_nftContractAddr][
            _tokenId
        ];
        if (listedItem.price == 0) {
            // the nft is not listed yet
            revert NFTMarketplace__NFTNotListedYet();
        }
        _;
    }

    /// @notice Allow user to sell NFT by calling this function
    /// @param _nftContractAddr the nft contract address
    /// @param _tokenId the token id on that nft contract
    /// @param _price the selling price of the nft
    function sellNft(
        address _nftContractAddr,
        uint256 _tokenId,
        uint256 _price
    ) public isNFTOwner(_nftContractAddr, _tokenId) {
        IERC721 nftContract = IERC721(_nftContractAddr);
        address operator = nftContract.getApproved(_tokenId);
        if (operator != address(this)) {
            revert NFTMarketplace__NFTNotApproved();
        }
        if (s_listedItems[_nftContractAddr][_tokenId].price != 0) {
            revert NFTMarketplace__NFTListedAlready();
        }
        s_listedItems[_nftContractAddr][_tokenId] = ListedItem({
            seller: msg.sender,
            nftContractAddr: _nftContractAddr,
            tokenId: _tokenId,
            price: _price
        });
        emit NewNFTItemListed(msg.sender, _nftContractAddr, _tokenId, _price);
    }

    /// @notice allow seller to update the listed NFT
    function upadteNftSellingState(
        address _nftContractAddr,
        uint256 _tokenId,
        uint256 _updatePrice
    )
        public
        isNFTOwner(_nftContractAddr, _tokenId)
        onlyListedItem(_nftContractAddr, _tokenId)
    {
        ListedItem storage listedItem = s_listedItems[_nftContractAddr][
            _tokenId
        ];
        listedItem.price = _updatePrice;
        emit NewNFTItemListed(
            msg.sender,
            _nftContractAddr,
            _tokenId,
            _updatePrice
        );
    }

    /// @notice Buy the listed nft on the marketplace
    /// @param _nftContractAddr the nft contract address
    /// @param _tokenId the token id the user want to buy that is hold by _nftContractAddr
    function buyNft(address _nftContractAddr, uint256 _tokenId)
        public
        payable
        onlyListedItem(_nftContractAddr, _tokenId)
    {
        ListedItem memory listedItem = s_listedItems[_nftContractAddr][
            _tokenId
        ];
        if (msg.value < listedItem.price) {
            revert NFTMarketplace__InsufficientAmountToBuyNft();
        }

        delete s_listedItems[_nftContractAddr][_tokenId];
        delete s_listedItemsVotes[_nftContractAddr][_tokenId];

        s_sellerEarned[listedItem.seller] += listedItem.price;

        IERC721(_nftContractAddr).safeTransferFrom(
            listedItem.seller,
            msg.sender,
            listedItem.tokenId
        );

        emit NFTSold(
            msg.sender,
            listedItem.nftContractAddr,
            listedItem.tokenId,
            listedItem.price
        );
    }

    /// @notice Allow the seller who listed their nft on the marketplace to cancel the listing
    function cancelListing(address _nftContractAddr, uint256 _tokenId)
        public
        onlyListedItem(_nftContractAddr, _tokenId)
        isNFTOwner(_nftContractAddr, _tokenId)
    {
        delete s_listedItemsVotes[_nftContractAddr][_tokenId];
        delete s_listedItems[_nftContractAddr][_tokenId];
        emit CancelListing(_nftContractAddr, _tokenId);
    }

    /// @notice Allow the user to "press a like" on the listed nft
    function voteOnNft(address _nftContractAddr, uint256 _tokenId)
        public
        onlyListedItem(_nftContractAddr, _tokenId)
    {
        s_listedItemsVotes[_nftContractAddr][_tokenId] += 1;
        emit VoteOnNft(
            _nftContractAddr,
            _tokenId,
            s_listedItemsVotes[_nftContractAddr][_tokenId]
        );
    }

    function withdrawEarned() public {
        uint256 earned = s_sellerEarned[msg.sender];
        if (earned <= 0) {
            revert NFTMarketplace__NothingToWithdraw();
        }

        delete s_sellerEarned[msg.sender];

        (bool success, ) = msg.sender.call{value: earned}("");
        if (!success) {
            revert NFTMarketplace__WithdrawFailed();
        }
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        if (!success) {
            revert NFTMarketplace__WithdrawFailed();
        }
    }

    /// @notice Get the listed item on the marketplace
    function getListedItem(address _nftContractAddr, uint256 _tokenId)
        public
        view
        returns (ListedItem memory)
    {
        return s_listedItems[_nftContractAddr][_tokenId];
    }

    /// @notice Get the amount of money the seller can pull out from the contract
    function getSellerEarned(address _seller) public view returns (uint256) {
        return s_sellerEarned[_seller];
    }

    /// @notice Get the amount of money the seller can pull out from the contract
    function getListedNftLikes(address _nftContractAddr, uint256 _tokenId)
        public
        view
        returns (uint256)
    {
        return s_listedItemsVotes[_nftContractAddr][_tokenId];
    }
}
