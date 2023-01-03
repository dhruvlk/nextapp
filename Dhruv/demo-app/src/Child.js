import React from 'react'
import ChildTwo from './Child-two'

const Child = (props) => {
  return (
    <div>
      <ChildTwo {...props}/>
    </div>
  )
}

export default Child
