import { Button, Form, Input, message, Modal, Select } from 'antd'
import React from 'react'

const AddProduct = ({ isAddModalOpen, setIsAddModalOpen, categories, products, setProducts }) => {
    const [form] = Form.useForm();

    const handleAddProduct = (values) => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/products/add-product`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
            message.success('Product added successfully!')
            form.resetFields();
            setProducts([
                ...products,
                {
                    ...values,
                    _id: Math.random(),
                    price: Number(values.price),
                }])
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            title="Add Product"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={handleAddProduct}
                form={form}
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
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddProduct