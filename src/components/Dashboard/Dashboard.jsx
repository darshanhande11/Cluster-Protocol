import React, { useState } from 'react'
import SideNav from '../../shared/SideNav/SideNav'
import CreatePool from './CreatePool/CreatePool'
import Pools from './Pools/Pools'
import './Dashboard.css'

const Dashboard = () => {
    const [item, setItem] = useState('createPool')
  return (
    <div className='dashboard-div'>
        <div className='sidenav-div'>
            <SideNav ci={{ item: item, setItem: setItem }} />
        </div>
        <div className='dashboard-content-div'>
            {
                item === 'createPool' ? <CreatePool className='cp-comp' /> : <Pools className='pools-comp' />
            }
        </div>
    </div>
  )
}

export default Dashboard