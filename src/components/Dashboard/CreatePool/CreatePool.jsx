import React from 'react'
import { Button, Input, Form } from 'antd';
import './CreatePool.css';

const CreatePools = () => {
  const [form] = Form.useForm();
  return (
    <div className='cp-div'>
      <h1 className='cp-heading'>Create Pool</h1>
      <Form className='cp-form' form={form} layout={'vertical'}
      >
        <Form.Item label="Pool Name" name="Pool name" rules={[{required: true}]} >
          <Input placeholder='Give some name to your Pool...' />
        </Form.Item>
        <Form.Item label="Collection Address of NFT" name="Collection Address" rules={[{required: true}]}  >
          <Input placeholder='e.g. : 0x042d434242015acd48e3889C2510DFe221D5fABb' />
        </Form.Item>
        <Form.Item label="Number of Participants" name="Number of Participants" rules={[{required: true}]} >
          <Input type='number' placeholder='minimum 1 participant required' />
        </Form.Item>
        <Form.Item label="Total Funds Required" name="Total Funds Required" rules={[{required: true}]} >
          <Input type='number' placeholder='in ether' />
        </Form.Item>
        <Form.Item label="" className='cp-submit-form-item'>
          <Button className='cp-submit-btn' type="primary" htmlType="submit">
            Create Pool
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreatePools