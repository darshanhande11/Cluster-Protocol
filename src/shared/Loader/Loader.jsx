import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import './Loader.css'

const Loader = (props) => {
  return (
    <ThreeCircles
      className="loader-pos"
      height={props.height || "100"}
      width={props.width || "100"}
      color={props.color ? props.color : "#00BFFF"}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
     />
  )
}

export default Loader