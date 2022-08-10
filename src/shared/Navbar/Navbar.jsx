import React from 'react'
import './Navbar.css'
import { Menu, Button } from 'antd';
import { ClusterOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='nav-div'>
        <Menu className='navbar' mode="horizontal" theme='dark'>
            <div className='nav-logo-div'>
                <ClusterOutlined className='nav-logo' />
                <span className='logo-heading'>
                    Cluster Protocol
                </span>
            </div>
            <div className='navbar-btn-div'>
                <Button type='primary' className='nav-btn' onClick={() => {
                    navigate("/dashboard");
                }}>
                    Create Pool
                </Button>
                <Button className='nav-btn'>
                    Connect
                </Button>
            </div>
        </Menu>
    </div>
  )
}

export default Navbar