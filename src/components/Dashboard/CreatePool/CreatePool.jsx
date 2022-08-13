import React, { useEffect, useState } from 'react'
import { Button, Input, Form, message, InputNumber } from 'antd';
import './CreatePool.css';
import FundsManagerContractArtifact from '../../../Ethereum/FundsManager.json'
import GetAccount from '../../../hooks/GetAccount.js'
import GetContract from '../../../hooks/GetContract';
import addresses from '../../../config'

const CreatePools = () => {

  const [poolData, setPoolData] = useState({
    title: '',
    address: '',
    participants: 0,
    funds: 0,
    addresses: [],
    mapValue: [],
    tokenId: 0
  })

  const getId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  // let address = GetAccount();
  let contract = GetContract(addresses.fundsManager, FundsManagerContractArtifact.abi);

  const handlePoolChange = (e) => {
    setPoolData({
      ...poolData,
      [e.target.name]: e.target.value
    })
    // console.log(" this is value and participants and pooldata ", poolData);
    if (e.target.name === 'participants') {
      console.log(" this is value ", e.target.value);
    console.log(" this is value and participants and pooldata ", poolData);
      setPoolData({
        ...poolData,
        mapValue: Array.from({ length: e.target.value }).fill('yo')
      })
    }
  }

  const createPool = async () => {
    try {
      console.log(" this is called ");
      if (contract) {
        // string memory _poolId, string memory _poolName, uint256 _poolSize , address[] memory _owners, uint256 _fundsGoal
        console.log(" this is updated pool data " ,poolData);
        let createPoolTxn = await contract.createPool(getId(5), poolData.title, poolData.mapValue.length, poolData.addresses, poolData.funds, poolData.tokenId);
        await createPoolTxn.wait();
      } else {
        message.warning('Please connect metamask first');
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleUserAddress = (e, id) => {
    try {
      let oldUsers = [...poolData.addresses];
      oldUsers[id - 1] = e.target.value;
      setPoolData({
        ...poolData,
        addresses: oldUsers
      });
      console.log(' this is updated pooldata ', poolData);
    } catch (err) {
      console.log(err.message);
    }
  }

  const [form] = Form.useForm();

  return (
    <div className='cp-div'>
      <h1 className='cp-heading'>Create Pool</h1>
      <Form className='cp-form' form={form} layout={'vertical'}
      >
        <Form.Item label="Pool Name" name="Pool name" rules={[{ required: true }]} >
          <Input placeholder='Give some name to your Pool...' name='title' onChange={(e) => handlePoolChange(e)} />
        </Form.Item>
        <Form.Item label="Collection Address of NFT" name="Collection Address" rules={[{ required: true }]}  >
          <Input placeholder='e.g. : 0x042d434242015acd48e3889C2510DFe221D5fABb' name='address' onChange={(e) => handlePoolChange(e)} />
        </Form.Item>
        <Form.Item label="Number of Participants" name="Number of Participants" rules={[{ required: true }]} >
          <InputNumber min={1} max={10} placeholder='minimum 1 participant required' name='participants' onChange={(val) => {
            setPoolData({
              ...poolData,
              participants: val,
              mapValue: Array.from({ length: val }).fill('yo')
            })
          }} />
        </Form.Item>
        <Form.Item label="Total Funds Required" name="Total Funds Required" rules={[{ required: true }]} >
          <Input type='number' placeholder='in ether' name='funds' onChange={(e) => handlePoolChange(e)} />
        </Form.Item>
        <Form.Item label="Token Id of NFT needed" name="Token Id of NFT needed" rules={[{ required: true }]} >
          <Input type='number' placeholder='int' name='tokenId' onChange={(e) => handlePoolChange(e)} />
        </Form.Item>
        {poolData.mapValue.map((data, id) => {
          return (
            <Form.Item label={"Address of owner " + (++id)} name={"Address of owner " + (id)} rules={[{ required: true }]} >
              <Input type='text' placeholder={"Address of owner " + (id)} onChange={(e) => handleUserAddress(e, id)} />
            </Form.Item>
          )
        })}
        <Form.Item label="" className='cp-submit-form-item'>
          <Button className='cp-submit-btn' type="primary" htmlType="submit" onClick={() => createPool()}>
            Create Pool
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreatePools