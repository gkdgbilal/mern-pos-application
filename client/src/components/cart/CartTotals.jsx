import { Button, message } from 'antd'
import React from 'react'
import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const CartTotals = () => {
    const cart = useSelector(state => state.cart)
    const { cartItems, total, tax } = cart
    const navigate = useNavigate()

    const dispatch = useDispatch()

    return (
        <div className='cart h-full max-h-[calc(100vh_-_90px)] flex flex-col'>
            <h2 className='bg-blue-600 text-center py-4 text-white font-bold tracking-wide'>Products in Cart</h2>
            <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
                {
                    cartItems.length > 0 ? cartItems.map(item => (
                        <li
                            className='cart-item flex justify-between'
                            key={item._id}
                        >
                            <div className='flex items-center'>
                                <img
                                    src={item.img}
                                    alt=""
                                    className='w-16 h-16 object-cover cursor-pointer'
                                    onClick={() => {
                                        dispatch(removeFromCart(item))
                                        message.success('Item removed from cart')
                                    }}
                                />
                                <div className='flex flex-col ml-2'>
                                    <b>{item.title}</b>
                                    <span>{item.price}$ x {item.quantity}</span>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Button
                                    type='primary'
                                    size='small'
                                    className='w-full flex items-center justify-center !rounded-full'
                                    icon={<PlusCircleOutlined />}
                                    onClick={() => dispatch(increaseQuantity(item))}
                                />
                                <span className='font-bold w-6 inline-block text-center'>{item.quantity}</span>
                                <Button
                                    type='primary'
                                    size='small'
                                    className='w-full flex items-center justify-center !rounded-full'
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => {
                                        if (item.quantity === 1) {
                                            if (window.confirm('Are you sure you want to remove this item from cart?')) {
                                                dispatch(removeFromCart(item))
                                                message.success('Item removed from cart')
                                            }
                                        } else {
                                            dispatch(decreaseQuantity(item))
                                        }
                                    }}
                                />
                            </div>
                        </li>
                    )).reverse()
                        :
                        <p className='text-center'>
                            No items in cart
                        </p>
                }
            </ul>
            <div className="cart-totals mt-auto">
                <div className="border-t border-b">
                    <div className="flex justify-between p-2">
                        <b>Sub Total</b>
                        <span>{total > 0 ? total.toFixed(2) : 0}$</span>
                    </div>
                    <div className="flex justify-between p-2">
                        <b>Tax {tax}%</b>
                        <span className="text-red-700">
                            {
                                (total * tax) > 0
                                    ?
                                    `+${(total * tax).toFixed(2)}`
                                    :
                                    0
                            }
                            $
                        </span>
                    </div>
                </div>
                <div className="border-b mt-4">
                    <div className="flex justify-between p-2">
                        <b className="text-xl text-green-500">Total</b>
                        <span className="text-xl">{total > 0 ? (total + (total * tax)).toFixed(2) : 0}$</span>
                    </div>
                </div>
                <div className="py-4 px-2">
                    <Button
                        type='primary'
                        size='large'
                        className='w-full'
                        onClick={() => navigate('/cart')}
                    >
                        Create Order
                    </Button>
                    <Button
                        type='primary'
                        size='large'
                        className='w-full mt-2 flex items-center justify-center'
                        danger
                        icon={<ClearOutlined />}
                        disabled={cartItems.length === 0}
                        onClick={() => {
                            if (cartItems.length > 0) {
                                if (window.confirm('Are you sure you want to remove this item from cart?')) {
                                    dispatch(clearCart())
                                    message.success('Item removed from cart')
                                }
                            } else {
                                message.warning('Cart is already empty!')
                            }
                        }}
                    >
                        Clear Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartTotals