import { Button, Card, Form, Input, message, Modal, Select } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/cartSlice';

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
    const { cartItems, total, tax } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/bills/add-bill`, {
                method: 'POST',
                body: JSON.stringify({
                    ...values,
                    subTotal: total,
                    tax: tax,
                    totalAmount: (total + (total * tax)).toFixed(2),
                    cartItems: cartItems
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
            if (res.status === 201) {
                setIsModalOpen(false)
                message.success('Bill created successfully')
                dispatch(clearCart())
                navigate('/bills')
            }

        } catch (error) {
            message.error('Something went wrong')
        }
    }

    return (
        <Modal
            title="Create Bill"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
        >
            <Form
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item
                    label='Customer Name'
                    name={'customerName'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input customer name',
                        }
                    ]}
                >
                    <Input
                        placeholder='Customer Name'
                    />
                </Form.Item>
                <Form.Item
                    label='Phone Number'
                    name={'customerPhoneNumber'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input phone number',
                        }
                    ]}
                    maxLength={11}
                >
                    <Input
                        placeholder='Phone Number'
                    />
                </Form.Item>
                <Form.Item
                    label='Payment Method'
                    name={'paymentMethod'}
                    rules={[
                        {
                            required: true,
                            message: 'Please select payment method',
                        }
                    ]}
                >
                    <Select placeholder='Payment Method'>
                        <Select.Option value='Cash'>Cash</Select.Option>
                        <Select.Option value='Credit Card'>Credit Card</Select.Option>
                    </Select>
                </Form.Item>
                <Card className='w-full'>
                    <div className='flex justify-between'>
                        <span>Sub Total</span>
                        <span>
                            {total > 0 ? total.toFixed(2) : 0}$
                        </span>
                    </div>
                    <div className='flex justify-between my-2'>
                        <span>Tax {tax}%</span>
                        <span className='text-red-600'>
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
                    <div className='flex justify-between'>
                        <b>Total</b>
                        <b>
                            {total > 0 ? (total + (total * tax)).toFixed(2) : 0}$
                        </b>
                    </div>
                    <div className='flex justify-end'>
                        <Button
                            className='mt-4'
                            type='primary'
                            htmlType='submit'
                            disabled={cartItems.length === 0}
                        >
                            Checkout
                        </Button>
                    </div>
                </Card>
            </Form>
        </Modal>
    )
}

export default CreateBill