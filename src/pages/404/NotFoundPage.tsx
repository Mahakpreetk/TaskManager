import { Button } from 'flowbite-react'
import React from 'react'

const NotFoundPage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen text-center'>
      <h1 className='text-7xl font-bold text-blue-700'>404</h1>
      <p>Page you are looking for seems not to exist.</p>
      <br />
      <br />
      <Button href='/'>Go Home</Button>
    </div>
  )
}

export default NotFoundPage
