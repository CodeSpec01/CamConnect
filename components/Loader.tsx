import Image from 'next/image'
import React from 'react'

const Loader = ({ height, width }: { height?: number, width?: number }) => {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <Image src='/icons/loading-circle.svg' alt='loading' width={height || 50} height={width || 50} />
    </div>
  )
}

export default Loader
