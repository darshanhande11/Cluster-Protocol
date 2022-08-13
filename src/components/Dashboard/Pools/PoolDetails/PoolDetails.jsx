import React from 'react'
import './PoolDetails.css'
import PdUserCard from './PdUserCard/PdUserCard';

const PoolDetails = () => {
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
  const poolName = 'Pool 1';
  return (
    <div className='pd-div'>
        <h1 className='pd-heading'>Pool Details for {poolName}</h1>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" className='pd-img' />
        <div className='pd-users-div'>
            {
                data.map((item) => {
                    return <PdUserCard key={item.id} userId={item.id} percentage={item.percentage} address={item.address} />
                })
            }
        </div>
    </div>
  )
}

export default PoolDetails