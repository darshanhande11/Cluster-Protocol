// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./OwnerShipToken.sol";

contract MarketPlaceInterface {
    function purchaseItem(uint _itemId) external payable {}
}

contract FundsManager {
    // below is DAI token address for now but will be replace with FakeItNFT token address later
    address MarketPlaceContractAddress = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0;
    MarketPlaceInterface MarketPlaceContract;
    // OwnerShipTokens ownerShipToken;

    struct pool {
        address[] owners;
        uint256 funds; 
        string poolName;
        uint256 poolSize;
        uint256 fundGoal;
        uint256 positiveCount;
        uint256 negativeCount;
        OwnerShipTokens ownerShipTokenAddress;
        string poolId;
        mapping(address => uint256) ownerShips;
        OwnerShipTokens OwnerShipTokenContract;
        uint256 tokenId;
        address collectionAddress;
    }

    mapping(string => pool) public pools;
    mapping(address => string[]) public poolOwners;
    string[] poolIds;

    function createPool(string memory _poolId, string memory _poolName, uint256 _poolSize , address[] memory _owners, uint256 _fundsGoal, uint256 _tokenId, address _collectionAddress) external {
        pools[_poolId].poolName = _poolName;
        pools[_poolId].poolSize = _poolSize;
        for(uint i=0;i<_poolSize; i++) {
            pools[_poolId].owners.push(_owners[i]);
        }
        pools[_poolId].fundGoal = _fundsGoal;
        poolOwners[msg.sender].push(_poolId);
        poolIds.push(_poolId);
        pools[_poolId].poolId = _poolId;
        pools[_poolId].tokenId = _tokenId;
        pools[_poolId].collectionAddress = _collectionAddress;
    }

    function contributeFunds(string memory _poolId) external payable {
        pools[_poolId].funds += msg.value;
        pools[_poolId].ownerShips[msg.sender] += msg.value;
    }

    // also we will be allowing user to only transfer the sufficient amount not more or less amount
    // making the below function public for now for testing purposes
     function buyNFT(string memory _poolId) private {
        // buy NFT and mint the ERC20 tokens to user
        MarketPlaceContract = MarketPlaceInterface(MarketPlaceContractAddress);
        MarketPlaceContract.purchaseItem{ value: 1000000000000000000 }(pools[_poolId].tokenId);
        OwnerShipTokens _tokenAddress =  new OwnerShipTokens(_poolId, _poolId);   
        pools[_poolId].ownerShipTokenAddress = _tokenAddress;
        pools[_poolId].OwnerShipTokenContract = OwnerShipTokens(_tokenAddress);  

        // let say currently the prize of NFT is 1000 USD and ownership token is pecked to 1 USD - 1 OWT
        for(uint i=0; i < pools[_poolId].owners.length; i++) {
            uint256 _nftShare = (pools[_poolId].ownerShips[msg.sender] / pools[_poolId].fundGoal) * 1000000000000000000;
            pools[_poolId].OwnerShipTokenContract.transfer(pools[_poolId].owners[i], 1000000000000000000);
        }
    }

    function makeConsensus(string memory _poolId, bool _isAgree) external {
        if(_isAgree) {
            pools[_poolId].positiveCount = pools[_poolId].positiveCount + 1; 
            if(pools[_poolId].positiveCount > (pools[_poolId].poolSize / 2)) {
                buyNFT(_poolId);
            }
        } else {
            pools[_poolId].negativeCount = pools[_poolId].negativeCount + 1; 
        }
    }
    
    function getUserPools() external view returns (string[] memory) {
        return poolOwners[msg.sender];
    }

    function getPoolOwners(string memory _poolId) external view returns (address[] memory) {
        return pools[_poolId].owners;
    }

    receive() external payable {
        
    }
}

