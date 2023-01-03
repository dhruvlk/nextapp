import React, { useEffect, useState } from 'react'
import Child from './Child'
import axios from 'axios'

const Parent = () => {
  const [demo, setDemo] = useState()
  const url = 'https://jsonplaceholder.typicode.com/users'

  // const data = "Hello World"
  useEffect(() => {
    axios.get(url).then((response) => {
      setDemo(response.data)
    })
  }, [])

  console.log(demo)

  return (
    <div>
      <Child demo={demo} />
      {/* <p>{demo.name}</p> */}
    </div>
  )
}

export default Parent
