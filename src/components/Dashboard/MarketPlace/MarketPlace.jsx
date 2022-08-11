import { Card, Button } from 'antd'
import { FaEthereum } from 'react-icons/fa';
import React from 'react'
import './MarketPlace.css'
import addresses from '../../../config'
import GetAccount from '../../../hooks/GetAccount';
import GetContract from '../../../hooks/GetContract';
import FakeItTokenContractArtifact from '../../../Ethereum/FakeIt.json'

const MarketPlace = () => {
  let userAddress = GetAccount();
  let fakeItTokenContract = GetContract(addresses.fakeItToken, FakeItTokenContractArtifact.abi);
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
        <button> mint </button>
        <div className='mp-grid-div'>
            {
                data.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            cover={<img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="cover-img" />}
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