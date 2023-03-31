import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'

const AddCategory = ({ isAddModalOpen, setIsAddModalOpen, categories, setCategories }) => {
    const [form] = Form.useForm();

    const handleAddCategory = (values) => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/categories/add-category`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
            message.success('Category added successfully!')
            form.resetFields();
            setCategories([
                ...categories,
                {
                    _id: Math.random(),
                    title: values.title
                }])
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            title="Add Category"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={handleAddCategory}
                form={form}
            >
                <Form.Item
                    label="Category Name"
                    name="title"
                    rules={[{ required: true, message: 'Category field is required!' }]}
                >
                    <Input placeholder="Category Name" />
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

export default AddCategory