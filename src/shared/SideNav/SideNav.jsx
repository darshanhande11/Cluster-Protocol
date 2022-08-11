import React from 'react';
import { Menu } from 'antd';
import { FaUsers, FaEthereum } from 'react-icons/fa';
import { AiFillFileAdd } from 'react-icons/ai';
import './SideNav.css';
import { useNavigate } from 'react-router-dom';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Pools', 'pools', <FaUsers style={{ fontSize: '1.2vw', color: 'white' }}/>),
  getItem('Create Pool', 'create-pool', <AiFillFileAdd style={{ fontSize: '1.2vw', color: 'white' }}/>),
  getItem('Marketplace', 'marketplace', <FaEthereum style={{ fontSize: '1.2vw', color: 'white' }}/>),
];

const SideNav = (props) => {
  const ci = props.ci;
  const navigate = useNavigate();
  const onClick = (e) => {
    ci.setItem(e.key);
    navigate(e.key);
  };

  return (
      <Menu
        onClick={onClick}
        collapsedWidth={0}
        selectedKeys={ci.item}
        defaultSelectedKeys={['pools']}
        mode="inline"
        items={items}
        theme={'dark'}
        className="side-nav-menu"
      />
  );
};

export default SideNav;