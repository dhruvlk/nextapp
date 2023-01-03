import React from 'react'

const ChildTwo = (props) => {
  console.log(props)
  const main = props.demo
  console.log(main)
  return (
    <div>
      {/* <p>{JSON.stringify(props.demo)}</p> */}
      {main.map((user) => {
        return <p>Name:-&nbsp;{user.name}</p>
      })}
    </div>
  )
}

export default ChildTwo
