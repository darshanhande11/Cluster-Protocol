import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loader = (props) => {
  return (
    <ThreeCircles
        height={props.height}
        width={props.width}
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