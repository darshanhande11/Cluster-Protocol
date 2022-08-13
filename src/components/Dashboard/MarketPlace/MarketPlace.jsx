import { Card, Button } from 'antd'
import { FaEthereum } from 'react-icons/fa';
import React from 'react'
import './MarketPlace.css'

const MarketPlace = () => {
  const data = [
    {
        img_url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "NFT Title",
        price: 5,
        address: "0x042d434242015acd48e3889C2510DFe221D5fABb"
    },
    {
        img_url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "NFT Title",
        price: 5,
        address: "0x042d434242015acd48e3889C2510DFe221D5fABb"
    },
    {
        img_url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "NFT Title",
        price: 5,
        address: "0x042d434242015acd48e3889C2510DFe221D5fABb"
    },
    {
        img_url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "NFT Title",
        price: 5,
        address: "0x042d434242015acd48e3889C2510DFe221D5fABb"
    },
    {
        img_url: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        title: "NFT Title",
        price: 5,
        address: "0x042d434242015acd48e3889C2510DFe221D5fABb"
    },
  ];
  const ActionButton = ({ text }) => (
    <Button type='primary' onClick={()=>{}} style={{ width: '95%' }} >
      {text}
    </Button>
  )

  return (
    <div className='mp-div'>
        <h1 className='mp-heading'>Market Place</h1>
        <div className='mp-grid-div'>
            {
                data.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            cover={<img className='mp-cover-img' src="https://i.pinimg.com/736x/86/9d/98/869d9814541e62ccb9439ed24d59b355.jpg" alt="cover-img" />}
                            actions={[
                                <ActionButton text={'Buy'} />,
                            ]}
                            className='mp-card'
                        >
                            <h3>{item.title}</h3>
                            <div className='mp-card-price'>
                                <span>Price</span><br/>
                                <div>
                                    <FaEthereum />
                                    {item.price}
                                </div>
                            </div>
                            <div className='mp-card-address'>
                                <span>Address</span><br/>
                                <div>{item.address.substring(0, 25).concat('...')}</div>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MarketPlace