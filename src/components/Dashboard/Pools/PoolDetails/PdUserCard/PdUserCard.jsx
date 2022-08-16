import { Card, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import './PdUserCard.css'

const { Meta } = Card;

const PdUserCard = (props) => {
  const [userBalance, setUserBalance] = useState();
  const [percentage, setPercentage] = useState();
  const getBalance = async () => {
    let balance = await props.balance(props.address);
    setUserBalance(balance / 10**18);
    let percent = await props.percentage(props.address);
    setPercentage(percent);
  }

  useEffect(() => {
    getBalance();
  }, [props.balance])

  return (
    <Card className='pd-card'>
        <Meta 
            avatar={<Avatar src={`https://robohash.org/${props.address}`} />}
            title={"Ownership " + percentage + "%"}
            description={props.address}
        />
        
    </Card>
  )
}

export default PdUserCard