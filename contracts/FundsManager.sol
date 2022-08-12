// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./OwnerShipToken.sol";

contract FakeItToken {
      function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual {}
}

contract FundsManager {
    // below is DAI token address for now but will be replace with FakeItNFT token address later
    address FakeItTokenContractAddress = 0xffe9330a68e7F43b8146Ac235eE3c809A5298B43;
    FakeItToken FakeItTokenContract;
    OwnerShipTokens ownerShipToken;

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
    }

    mapping(string => pool) public pools;
    mapping(address => string[]) public poolOwners;
    string[] poolIds;

    function createPool(string memory _poolId, string memory _poolName, uint256 _poolSize , address[] memory _owners, uint256 _fundsGoal) external {
        pools[_poolId].poolName = _poolName;
        pools[_poolId].poolSize = _poolSize;
        for(uint i=0;i<_poolSize; i++) {
            pools[_poolId].owners.push(_owners[i]);
        }
        pools[_poolId].fundGoal = _fundsGoal;
        poolOwners[msg.sender].push(_poolId);
        poolIds.push(_poolId);
        pools[_poolId].poolId = _poolId;
    }

    function contributeFunds(string memory _poolId) external payable {
        pools[_poolId].funds += msg.value;
    }

     function buyNFT(string memory _poolId) private {
        // buy NFT and mint the ERC20 tokens to user

        for(uint i=0;i<pools[_poolId].owners.length; i++) {
            bytes memory _symbol;
            _symbol[0] = bytes(_poolId)[0];
            _symbol[1] = bytes(_poolId)[1];
           pools[_poolId].ownerShipTokenAddress = new OwnerShipTokens(_poolId, string(_symbol));      
        }
    }

    function makeConsensus(string memory _poolId, bool _isAgree) external {
        if(_isAgree) {
            pools[_poolId].positiveCount++; 
            if(pools[_poolId].positiveCount > pools[_poolId].poolSize / 2) {
                buyNFT(_poolId);
            }
        } else {
            pools[_poolId].negativeCount++; 
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

