import { Card, Avatar } from 'antd'
import React from 'react'
import './PdUserCard.css'

const { Meta } = Card;

const PdUserCard = (props) => {
  return (
    <Card className='pd-card'>
        <Meta 
            avatar={<Avatar src={`https://robohash.org/${props.userId}`} />}
            title={`${props.percentage} %`}
            description={props.address}
        />
    </Card>
  )
}

export default PdUserCard