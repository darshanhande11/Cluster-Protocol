import React, { useState, useEffect } from 'react'
import './PoolDetails.css'
import PdUserCard from './PdUserCard/PdUserCard';
import { useParams } from 'react-router-dom';
import GetContract from '../../../../hooks/GetContract';
import FundsManagerArtifactContract from '../../../../Ethereum/FundsManager.json'
import addresses from '../../../../config';
import FakeItTokenContractArtifact from '../../../../Ethereum/FakeIt.json'
import { ethers } from 'ethers';
import Axios from 'axios'
import OwnerShipTokenArtifact from '../../../../Ethereum/OwnerShipTokens.json'
import Loader from '../../../../shared/Loader/Loader';

const PoolDetails = () => {
    // balanceOf(address account
  let { poolId } = useParams();
  let contract = GetContract(addresses.fundsManager, FundsManagerArtifactContract.abi);
//   let fakeItTokenContract = GetContract()
  const [poolOwners, setPoolOwners] = useState([]);
  const [loadStatus, setLoadStatus] = useState(false);
  const [poolTokenContract, setPoolTokenContract] = useState(null);
  const [poolTokenAddress, setPoolTokenAddress] = useState('');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [collectionContract, setCollectionContract] = useState(null);
  const [imageUri, setImageUri] = useState('');
  let ethProvider = new ethers.providers.Web3Provider(window.ethereum); 
//   new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", FakeItTokenContractArtifact.abi, ethProvider.getSigner(0))
  const getPoolOwners = async () => {
    try {
        setLoadStatus(true);
        let poolOwners = await contract.getPoolOwners(poolId);
        // console.log("these are pool owners ", poolOwners);
        setPoolOwners(poolOwners);
        let poolData = await contract.pools(poolId);
        // console.log(" this is whole pool data ", poolData);
        setPoolTokenAddress(poolData.ownerShipTokenAddress)
        let poolContract = new ethers.Contract(poolData.ownerShipTokenAddress, OwnerShipTokenArtifact.abi, ethProvider.getSigner(0))
        setCollectionAddress(poolData.collectionAddress);
        console.log(" this is poool contract ", poolContract);
        setPoolTokenContract(poolContract);
        // console.log(poolData.collectionAddress);
        let fakeItTokenContract = new ethers.Contract(poolData.collectionAddress, FakeItTokenContractArtifact.abi, ethProvider.getSigner(0))
        setCollectionContract(fakeItTokenContract);
        // console.log(poolData.tokenId)
        let ipfsUri = await fakeItTokenContract.tokenURI(poolData.tokenId);
        // console.log(ipfsUri);
        let imageUri = await Axios.get(ipfsUri);
        // console.log(imageUri);
        setImageUri(imageUri.data.uri);
        setLoadStatus(false);
    } catch (err) {
        console.log(err.message);
    }
  }
  useEffect(() => {
    getPoolOwners();
  }, [])

  const tokenBalance = async (userAddress) => {
    console.log(" this is not alling ");
    try {
        if(poolTokenContract) {
            let userTokenBalance = await poolTokenContract.balanceOf(userAddress);
            console.log("balance ", userTokenBalance);
            console.log(" this is user balance ", parseInt(userTokenBalance._hex));
            return parseInt(userTokenBalance._hex);
        }
    } catch (err) {
        console.log(err.message);
    }
  }

  const data = [
    {
        id: 1,
        percentage: 20,
        address: '0xCE807535316Aeac7d3108E93B7F1dADaaBbD36A0',
    },
    {
        id: 2,
        percentage: 20,
        address: '0xCE807535316Aeac7d3108E93B7F1dADaaBbD36A0',
    },
    {
        id: 3,
        percentage: 20,
        address: '0xCE807535316Aeac7d3108E93B7F1dADaaBbD36A0',
    },
    {
        id: 4,
        percentage: 20,
        address: '0xCE807535316Aeac7d3108E93B7F1dADaaBbD36A0',
    },
  ];
//   const poolName = 'Pool 1';
  return (
    <div className='pd-div'>
      {loadStatus && <Loader />}
      {!loadStatus && <>
        <h1 className='pd-heading'>Ownership Distribution</h1>
        <img 
        src={imageUri}
        alt={imageUri}
        className='pd-img' />
        <div className='pd-users-div'>
            {
                // data.map((item) => {
                    // return <PdUserCard key={item.id} userId={item.id} percentage={item.percentage} address={item.address} />
                // })
                poolOwners.map((address, id) => {
                    return <PdUserCard key={id} poolId={poolId} userId={id} percentage="20" balance={(address) => tokenBalance(address)} address={address} />
                })
            }
        </div>
      </>}
    </div>
  )
}

export default PoolDetails