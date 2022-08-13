import { Card, Avatar } from 'antd'
import React from 'react'

const { Meta } = Card;

const PdUserCard = (props) => {
  return (
    <Card>
        <Meta 
            avatar={<Avatar src={`https://robohash.org/${props.address}`} />}
            title={`${props.percentage} %`}
            description={props.address}
        />
    </Card>
  )
}

export default PdUserCard