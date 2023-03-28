// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * Limited edition NFTs: You can create limited edition NFTs with unique features that are only available to a select number of buyers. This feature can increase the rarity and value of the NFT.
 */

/// @title ERC721
/// @author Ng Ju Peng
/// @notice A normal ERC721 contract with an extension of limited edition NFTs
contract AINFT is ERC721URIStorage, Ownable {
    AggregatorV3Interface internal s_priceFeed; // chainlink price feed address
    uint256 private s_tokenCounter; // track the number of minted nfts
    uint256 private immutable i_minimumUSDAmount; // minimum usd amount to mint a nft
    address private s_auctionAddress; // the address of the auction contract
    uint8 private s_limitedTokenCounter; // track the number of minted limited edition nfts
    uint8 private constant MAX_LIMITED_TOKEN_SUPPLY = 100; // maximum number of limited edition nfts can be minted

    mapping(uint256 => bool) s_isLimitedToken;
    mapping(address => bool) s_isAuthorized;

    event MintedNewNFT(address indexed user, uint256 indexed tokenId);
    event MintedNewLimitedNFT(address indexed user, uint256 indexed tokenId);
    event WithdrawFund(address indexed owner, uint256 amount);
    event GrantedPermission(address indexed from, address indexed to);

    error AINFT__WithdrawFundFailed();
    error AINFT__InSufficientFund();
    error AINFT__Unauthorized();
    error AINFT__InvalidAddress();
    error AINFT__AlreadyHavePermission(address user);
    error AINFT__ExceededMaxLimitedToken();

    modifier onlyAuthorized() {
        if (!s_isAuthorized[msg.sender]) {
            revert AINFT__Unauthorized();
        }
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address _priceFeed,
        uint256 _minimumUSDAmount
    ) ERC721(_name, _symbol) {
        s_priceFeed = AggregatorV3Interface(_priceFeed);
        s_tokenCounter = 0;
        i_minimumUSDAmount = _minimumUSDAmount * 10**18;
        s_isAuthorized[msg.sender] = true;
    }

    /// @notice Mint a NFT with a minimum of i_minimumUSDAmount dollar
    /// @dev Store the NFT tokenID according to the caller
    /// @param _tokenURI the token URI that contain the pointer to the AI generated image and also metadata
    function mintNft(string calldata _tokenURI) public payable {
        uint256 usdAmount = ethToUSD(msg.value);
        if (usdAmount < i_minimumUSDAmount) {
            revert AINFT__InSufficientFund();
        }
        s_tokenCounter++;
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, _tokenURI);
        emit MintedNewNFT(msg.sender, s_tokenCounter);
    }

    /// @notice Mint the limited edition nft and only the authorized user can call this function
    /// @dev It will mainly be call by the auction contract
    /// @param _tokenURI the ipfs link to access the metadata
    function mintLimitedEditionNft(string calldata _tokenURI)
        public
        onlyAuthorized
    {
        s_limitedTokenCounter++;
        if (s_limitedTokenCounter > MAX_LIMITED_TOKEN_SUPPLY) {
            revert AINFT__ExceededMaxLimitedToken();
        }
        s_tokenCounter++;
        s_isLimitedToken[s_tokenCounter] = true;
        _safeMint(s_auctionAddress, s_tokenCounter);
        _setTokenURI(s_tokenCounter, _tokenURI);
        emit MintedNewLimitedNFT(s_auctionAddress, s_tokenCounter);
    }

    /// @notice Allow the contract owner to withdraw the money make by the contract
    function withdraw() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        if (!success) {
            revert AINFT__WithdrawFundFailed();
        }
        emit WithdrawFund(msg.sender, address(this).balance);
    }

    /// @notice Allow the authorized user to grant permission to other address
    /// @param _to the address that is agoing to be granted permission
    function grantPermission(address _to) public onlyAuthorized {
        if (_to == address(0)) {
            revert AINFT__InvalidAddress();
        }
        if (s_isAuthorized[_to]) {
            revert AINFT__AlreadyHavePermission(_to);
        }
        s_isAuthorized[_to] = true;
        emit GrantedPermission(msg.sender, _to);
    }

    /// @notice Allow the authorized user to set the address of the auction contract
    /// @param _auctionAddress the address of the auction contract
    function setAuctionContract(address _auctionAddress) public onlyAuthorized {
        if (_auctionAddress == address(0)) {
            revert AINFT__InvalidAddress();
        }
        s_auctionAddress = _auctionAddress;
    }

    /// @notice Read the price of ETH in USD
    /// @return Return the price of ETH in USD
    function getLatestPrice() public view returns (uint256) {
        uint8 decimals = s_priceFeed.decimals();
        (, int256 price, , , ) = s_priceFeed.latestRoundData();
        return uint256(price * int256(10**(18 - decimals)));
    }

    /// @notice Return the amount of USD based on the passed in ETH amount
    /// @param _ethAmount amount of ETH in wei
    /// @return The amount of USD needed
    function ethToUSD(uint256 _ethAmount) public view returns (uint256) {
        uint256 ethLatestPrice = getLatestPrice();
        uint256 ethAmountInUSD = (_ethAmount * ethLatestPrice) / (10**18);
        return ethAmountInUSD;
    }

    /// @return Return true if the token id is belonging to limited edition nft
    function isLimitedEditionNft(uint256 _tokenId) public view returns (bool) {
        return s_isLimitedToken[_tokenId];
    }

    /// @return Return true if the user is authorized
    function isUserAuthorized(address _user) public view returns (bool) {
        return s_isAuthorized[_user];
    }

    /// @return Return the price feed address
    function getPriceFeed() public view returns (address) {
        return address(s_priceFeed);
    }

    /// @return Return the token counter
    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    /// @return Return the token counter for limited edition NFT
    function getLimitedTokenCounter() public view returns (uint8) {
        return s_limitedTokenCounter;
    }

    /// @return Return the minimum USD amount required to mint an NFT
    function getMinimumUSDAmount() public view returns (uint256) {
        return i_minimumUSDAmount;
    }

    /// @return Return the address of the auction contract address
    function getAuctionContractAddress() public view returns (address) {
        return s_auctionAddress;
    }

    /// @return Return the maximum supply for limited edition NFT
    function getMaximumLimitedTokenSupply() public pure returns (uint8) {
        return MAX_LIMITED_TOKEN_SUPPLY;
    }
}
