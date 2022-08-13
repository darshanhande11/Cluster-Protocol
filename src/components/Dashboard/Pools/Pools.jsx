import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { FaUsers } from 'react-icons/fa';
import { List, Space, Button, Modal, Form, Input } from 'antd';
import './Pools.css'
import React from 'react';
import { useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  id: i,
  title: `ant design part ${i}`,
  funds: '2.03 ETH / 8.00 ETH',
  participants: i,
}));



const Pools = () => {
  const [isVis, setVis] = useState(false);
  const [form] = useForm();
  const addFunds = () => {
    setVis(false);
  }
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  
  const ActionButton = ({ text }) => (
    <Button type='primary' onClick={()=>{setVis(true)}} >
      {text}
    </Button>
  )
  return (
    <div className='pools-div'> 
        <div className='pools-list-par'>
        <h1 className='pools-heading'>Your Pools</h1>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={FaUsers} text={item.participants} key="list-vertical-users-o" />,
                <ActionButton text={'Add Funds'} />,
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
                title={<Link to={`/pools/${item.id}`}>{item.title}</Link>}
              />
              {item.funds}
            </List.Item>
          )}
        />
        <Modal 
          title="Add Funds"
          visible={isVis}
          onOk={addFunds}
          onCancel={()=>{setVis(false)}}
        >
          <Form className='addfunds-modal-form' form={form} layout="vertical">
            <Form.Item>
              <Input 
                type="number" 
                min="0.000000000000000001"
                placeholder="Enter amount in ETH"
                step="0.000000000000000001" 
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Pools