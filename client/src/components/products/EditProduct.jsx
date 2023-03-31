import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const EditProduct = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState({})

    const [form] = Form.useForm();

    const getProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/get-all`)
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const getCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/get-all`)
            const data = await response.json()
            data && setCategories(() => data.map(category => ({
                ...category,
                value: category.title,
            })))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleEditProduct = async (values) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/update-product`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...values,
                    productId: editingProduct._id,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
            if (res.status === 200) {
                message.success('Product updated successfully!')
                setIsEditModalOpen(false)
                setProducts(products.map(product => {
                    if (product._id === editingProduct._id) {
                        return {
                            ...product,
                            ...values
                        }
                    }
                    return product
                }));
            }
        } catch (error) {
            message.error('Something went wrong!')
            console.log(error)
        }
    }

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/products/delete-product`, {
                    method: 'DELETE',
                    body: JSON.stringify({ productId }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                })
                if (res.status === 200) {
                    message.success('Product deleted successfully!')
                    setIsEditModalOpen(false)
                    setProducts(products.filter(product => product._id !== productId))
                }
            } catch (error) {
                message.error('Something went wrong!')
                console.log(error)
            }
        }
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'title',
            width: '8%',
            render: (_, record) => (
                <Form>
                    <Form.Item
                        className='mb-0'
                        name='title'
                    >
                        {record.title}
                    </Form.Item>
                </Form>
            )
        },
        {
            title: 'Product Image',
            dataIndex: 'img',
            width: '4%',
            render: (_, record) => (
                <Form>
                    <Form.Item
                        className='mb-0'
                        name='title'
                    >
                        <img
                            src={record.img}
                            alt={record.title}
                            className='w-full h-20 object-cover'
                        />
                    </Form.Item>
                </Form>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '8%',
            render: (_, record) => (
                <Form>
                    <Form.Item
                        className='mb-0'
                        name='title'
                    >
                        {record.price}
                    </Form.Item>
                </Form>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            width: '8%',
            render: (_, record) => (
                <Form>
                    <Form.Item
                        className='mb-0'
                        name='title'
                    >
                        {record.category}
                    </Form.Item>
                </Form>
            )
        },
        {
            title: "Action",
            dataIndex: "action",
            width: '8%',
            render: (text, record) => (
                <div>
                    <Button
                        type="text"
                        className="text-blue-500"
                        onClick={() => {
                            form.resetFields()
                            setIsEditModalOpen(true)
                            setEditingProduct(record)
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        type="text"
                        danger
                        onClick={() => handleDeleteProduct(record._id)}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ]

    return (
        <>
            <Table
                bordered
                dataSource={products}
                columns={columns}
                rowKey={record => record._id}
                scroll={{
                    x: 1000,
                    y: 600
                }}
            />
            <Modal
                title="Update Product"
                open={isEditModalOpen}
                onCancel={() => {
                    form.resetFields()
                    setIsEditModalOpen(false)
                }}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleEditProduct}
                    form={form}
                    initialValues={editingProduct}
                >
                    <Form.Item
                        label="Product Name"
                        name="title"
                        rules={[{ required: true, message: 'Product field is required!' }]}
                    >
                        <Input placeholder="Product Name" />
                    </Form.Item>
                    <Form.Item
                        label="Product Image"
                        name="img"
                        rules={[{ required: true, message: 'Product Image field is required!' }]}
                    >
                        <Input
                            placeholder="Product Image"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Price field is required!' }]}
                    >
                        <Input
                            placeholder="Price"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Choose Category"
                        name="category"
                        rules={[{ required: true, message: 'Category field is required!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.title ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                            }
                            options={categories}
                        />
                    </Form.Item>
                    <Form.Item
                        className="flex justify-end mb-0"
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditProduct