import { Marquee } from '@components/magicui/marquee'
import React from 'react'

function Marque() {
  return (
    <>
       <div className="bg-gray-100 border-y border-gray-300 py-2">
      <Marquee className="text-lg font-medium text-gray-800">
        <span className="mx-8">🔥 Flash Sale: 50% OFF on all summer wear!</span>
        <span className="mx-8">🚚 Free shipping on orders over $50</span>
        <span className="mx-8">🎉 New arrivals are live now!</span>
        <span className="mx-8">💳 Use code WELCOME10 for 10% off</span>
      </Marquee>
    </div>
    
    </>
  )
}

export default Marque;