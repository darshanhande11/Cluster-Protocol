import React, { useState, useEffect } from 'react'
import './PoolDetails.css'
import PdUserCard from './PdUserCard/PdUserCard';
import { useParams } from 'react-router-dom';
import GetContract from '../../../../hooks/GetContract';
import FundsManagerArtifactContract from '../../../../Ethereum/FundsManager.json'
import addresses from '../../../../config';

const PoolDetails = () => {

  let { poolId } = useParams();
  let contract = GetContract(addresses.fundsManager, FundsManagerArtifactContract.abi);
  const [poolOwners, setPoolOwners] = useState([]);
  const [poolTokenAddress, setPoolTokenAddress] = useState('');

  const getPoolOwners = async () => {
    try {
        let poolOwners = await contract.getPoolOwners(poolId);
        console.log("these are pool owners ", poolOwners);
        setPoolOwners(poolOwners);
        let poolData = await contract.pools(poolId);
        setPoolTokenAddress(poolData.ownerShipTokenAddress)
        console.log(" this is pool data ", poolData);
    } catch (err) {
        console.log(err.message);
    }
  }
  useEffect(() => {
    getPoolOwners();
  }, [])

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
  return (
    <div className='pd-div'>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" className='pd-img' />
        <div className='pd-users-div'>
            {
                // data.map((item) => {
                    // return <PdUserCard key={item.id} userId={item.id} percentage={item.percentage} address={item.address} />
                // })
                poolOwners.map((address, id) => {
                    return <PdUserCard key={id} userId={id} percentage="20" address={address} />
                })
            }
        </div>
    </div>
  )
}

export default PoolDetails