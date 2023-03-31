import { message } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from "../../redux/cartSlice";

const ProductItem = ({ product }) => {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }))
        message.success('Product added to cart')
    }

    return (
        <div
            className='product-item border hover:shadow-lg cursor-pointer transition-all select-none'
            onClick={handleAddToCart}
        >
            <div className='product-img'>
                <img
                    src={product.img}
                    alt=""
                    className='w-full h-28 object-cover border-b'
                />
            </div>
            <div className="product-info flex flex-col p-3">
                <span className='font-bold'>{product.title}</span>
                <span>{product.price}$</span>
            </div>
        </div>
    )
}

export default ProductItem