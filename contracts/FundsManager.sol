// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./OwnerShipToken.sol";

contract MarketPlaceInterface {
    function purchaseItem(uint _itemId) external payable {}
}

contract FundsManager {
    // below is DAI token address for now but will be replace with FakeItNFT token address later
    address MarketPlaceContractAddress = 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9;
    // goerli market place 0xE38cfC8E90D92DD66098aAEBDABBE4b4d721365A
    // hardhat market place 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
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
        mapping(address => uint) voters;
    }

    mapping(string => pool) public pools;
    mapping(address => string[]) public poolOwners;
    string[] poolIds;

    function createPool(string memory _poolId, string memory _poolName, uint256 _poolSize , address[] memory _owners, uint256 _fundsGoal, uint256 _tokenId, address _collectionAddress) external {
        pools[_poolId].poolName = _poolName;
        pools[_poolId].poolSize = _poolSize;
        for(uint i=0;i<_poolSize; i++) {
            pools[_poolId].owners.push(_owners[i]);
            // 2 means they are part of voting mechanism
            pools[_poolId].voters[_owners[i]] = 2;
            poolOwners[_owners[i]].push(_poolId);
        }
        pools[_poolId].fundGoal = _fundsGoal;
        poolIds.push(_poolId);
        pools[_poolId].poolId = _poolId;
        pools[_poolId].tokenId = _tokenId;
        pools[_poolId].collectionAddress = _collectionAddress;
    }

    function contributeFunds(string memory _poolId) external payable {
        pools[_poolId].funds += msg.value;
        pools[_poolId].ownerShips[msg.sender] += msg.value;
    }

    function getUserContribution(string memory _poolId, address _userAddress) external view returns(uint256) {
        return pools[_poolId].ownerShips[_userAddress];
    }

    // also we will be allowing user to only transfer the sufficient amount not more or less amount
    // making the below function public for now for testing purposes
     function buyNFT(string memory _poolId) private {
        // buy NFT and mint the ERC20 tokens to user
        MarketPlaceContract = MarketPlaceInterface(MarketPlaceContractAddress);
        // the value is the price of NFT currently it is fix to 10eth so every pool has value o 10eth
        // MarketPlaceContract.purchaseItem{ value: 10000000000000000000 }(pools[_poolId].tokenId);
        // for goerli contract playing safe transfering only 0.01
        // MarketPlaceContract.purchaseItem{ value: 10000000 * 1000000000000 }(pools[_poolId].tokenId);
        MarketPlaceContract.purchaseItem(pools[_poolId].tokenId + 1);
        OwnerShipTokens _tokenAddress =  new OwnerShipTokens(_poolId, _poolId);   
        pools[_poolId].ownerShipTokenAddress = _tokenAddress;
        pools[_poolId].OwnerShipTokenContract = OwnerShipTokens(_tokenAddress);  

        // for simplicity for now consider 1eth = 1token
        for(uint i=0; i < pools[_poolId].owners.length; i++) {
            // below one will be used for hardhat contract
            uint256 _nftShare = (pools[_poolId].ownerShips[pools[_poolId].owners[i]] / pools[_poolId].fundGoal) * 1000000000000000000;
            pools[_poolId].OwnerShipTokenContract.transfer(pools[_poolId].owners[i], _nftShare);
        }
    }

    function makeConsensus(string memory _poolId, bool _isAgree) external {
        require(pools[_poolId].voters[msg.sender] == 2, "You are not authorized to vote");
        if(_isAgree) {
            pools[_poolId].positiveCount = pools[_poolId].positiveCount + 1; 
            if(pools[_poolId].positiveCount > (pools[_poolId].poolSize / 2)) {
                buyNFT(_poolId);
            }
        } else {
            pools[_poolId].negativeCount = pools[_poolId].negativeCount + 1; 
        }
        // 1 means unhone vote kardiya
        pools[_poolId].voters[msg.sender] = 1;
    }

    function isVoted(string memory _poolId) external view returns (bool) {
        require(pools[_poolId].voters[msg.sender] != 0, "You are not authorized to vote");
        if(pools[_poolId].voters[msg.sender] == 1) {
            return true; 
        }
        return false;
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

