import React, { useState } from 'react'
import Header from '../components/header/Header'
import EditProduct from '../components/products/EditProduct'

const ProductPage = () => {
    const [search, setSearch] = useState('')
    return (
        <>
            <Header
                setSearch={setSearch}
            />
            <div className='px-6'>
                <h1
                    className='text-4xl font-bold text-center mt-4'
                >
                    Products
                </h1>
                <EditProduct />
            </div>
        </>
    )
}

export default ProductPage