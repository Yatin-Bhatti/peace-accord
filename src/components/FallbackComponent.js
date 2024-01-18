import React from 'react'
import "./FallbackComponent.css"
import { Union } from '../icons/Union'
import { AnimatedIcon } from '../icons/AnimatedIcon'

function FallbackComponent() {
  return (
    <div
    className="fallBody"
    >
      {/* <Union width={40} height={40} /> */}
      <AnimatedIcon/>
    </div>
  )
}

export default FallbackComponent