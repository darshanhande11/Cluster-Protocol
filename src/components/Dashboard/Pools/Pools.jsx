import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { FaUsers } from 'react-icons/fa';
import { List, Space, Button, Modal, Form, Input } from 'antd';
import './Pools.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'antd/lib/form/Form';
import GetAccount from '../../../hooks/GetAccount'
import GetContract from '../../../hooks/GetContract';
import FundsManagerContractArtifact from '../../../Ethereum/FundsManager.json'
import { ethers } from 'ethers';
import addresses from '../../../config';
import { Link } from 'react-router-dom';

// const data = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   title: `ant design part ${i}`,
//   funds: '2.03 ETH / 8.00 ETH',
// }));
// =======

// const data = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   id: i,
//   title: `ant design part ${i}`,
//   funds: '2.03 ETH / 8.00 ETH',
//   participants: i,
// }));



const Pools = () => {
  const [isVis, setVis] = useState(false);
  const [form] = useForm();
  const [userPools, setUserPools] = useState([]);
  const [funds, setFunds] = useState(0);
  const [currentPoolId, setCurrentPoolId] = useState('');
  let address = GetAccount();
  let contract = GetContract(addresses.fundsManager, FundsManagerContractArtifact.abi);

  const isUserPool = async (pool) => {
    try {
      console.log(" this is pool info ", pool);
      let poolOwners = await contract.getPoolOwners(pool.poolId);
      console.log(" theses are pool owners and address ", poolOwners + "  " + address);
      let final = poolOwners.filter((owner) => owner === address);
      console.log(" these is user address ", final);
      return final.length > 0;
    } catch (err) {
      console.log(err.message);
    }
  }
  const getUserPools = async () => {
    console.log(" this is address and contract ", typeof address + " " + contract);
    try {
      let userPoolIds = await contract.getUserPools();
      console.log(" this are user pool ids ", userPoolIds);
      let allUserPools = [];
      for (let i = 0; i < userPoolIds.length; i++) {
        let pool = await contract.pools(userPoolIds[i]);
        // allUserPools.push(pool);
        // console.log(" this is pool ", pool);
        // console.log(" these are pool funds ", parseInt(pool.funds._hex));
        if(await isUserPool(pool)) {
          allUserPools.push({
            goal: parseInt(pool.fundGoal._hex),
            funds: parseInt(pool.funds._hex) / 10 ** 18,
            negate: parseInt(pool.negativeCount._hex),
            positive: parseInt(pool.positiveCount._hex),
            name: pool.poolName,
            size: parseInt(pool.poolSize._hex),
            poolId: pool.poolId
          })
        }
      }
      console.log(" this is all user pools ", allUserPools);
      setUserPools(allUserPools);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getUserPools();
  }, [])

  const addFunds = () => {
    setVis(false);
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const ActionButton = ({ text, poolId }) => (
    <Button type='primary' onClick={() => { setVis(true); setCurrentPoolId(poolId) }} >
      {text}
    </Button>
  )

  const contributeFundsToPool = async () => {
    try {
      console.log(" this is current pool id ", currentPoolId);
      let contributeTxn = await contract.contributeFunds(currentPoolId, { value: ethers.utils.parseEther(funds) });
      await contributeTxn.wait();
      setVis(false);
    } catch (err) {
      console.log(err.message);
    }
  }


  return (
    <div className='pools-list-par'>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={userPools}
        renderItem={(item) => (
          <List.Item
            key={item.poolId}
            actions={[
              <IconText icon={FaUsers} text={item.size} key="list-vertical-users-o" />,
              <ActionButton text={'Add Funds'} poolId = {item.poolId}
              // onClick={() => {
              //   console.log(" this is called ");
              //   console.log(" this is pool id ", item.poolId);

              //   setVis(true);
              // }} 
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              title={<Link to={`/pools/${item.poolId}`}>{item.title}</Link>}
            />
            {item.funds + ' ETH / ' + item.goal + ' ETH'}
          </List.Item>
        )}
      />
      <Modal
        title="Add Funds"
        visible={isVis}
        onOk={() => contributeFundsToPool()}
        onCancel={() => { setCurrentPoolId(''); setVis(false) }}
      >
        <Form className='addfunds-modal-form' form={form} layout="vertical">
          <Form.Item>
            <Input
              type="number"
              min="0.000000000000000001"
              placeholder="Enter amount in ETH"
              step="0.000000000000000001"
              onChange={(e) => setFunds(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Pools