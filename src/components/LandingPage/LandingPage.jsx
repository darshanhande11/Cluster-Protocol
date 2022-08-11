import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import React from 'react'
import Navbar from '../../shared/Navbar/Navbar'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="lp-bg-div">
      <div className='lp-row1'>
        <div className='lp-heading-div'>
          <h1 className='lp-heading'>Privately own NFT <br /> in a Group.</h1>
        </div>
        <div className='lp-illus-div'>
          <img className='lp-illus' src={'https://pixelplex.io/wp-content/uploads/2022/05/how-fractional-nfts-work-meta.jpg'} alt={'illust.png'} />
        </div>
      </div>
      <div className='lp-row2'>
        <Button size='large' type='primary' className='lp-button' onClick={()=>{
          navigate("/create-pool");
        }}>
          <span className='lp-button-text'>Get Started</span>
          <RightOutlined className='lp-button-icon' />
        </Button>
      </div>
    </div>
  )
}

export default LandingPage