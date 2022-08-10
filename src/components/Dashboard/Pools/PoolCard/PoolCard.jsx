import React from 'react'
import { Card } from 'antd'


const PoolCard = () => {
  return (
    <div className='pool-card'>
        <Card.Meta 
            title="Pool Name"
            description="2.49 ETH / 8.00 ETH"
        />
    </div>
  )
}

export default PoolCard