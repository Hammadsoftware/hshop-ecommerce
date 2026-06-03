import React from 'react'
import ProductPage from '../Common/ProductDetails'

function Bestseller() {
  return (
    <>
    <div className='flex flex-col items-center justify-center w-full h-auto lg:p-10 p-4'>
<h1 className='text-4xl font-bold text-center text-black p-5'>
Best Seller
</h1>
<ProductPage />
    </div>
    
    
    </>
  )
}

export default Bestseller