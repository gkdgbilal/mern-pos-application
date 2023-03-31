import { Button, Form, Input, message, Modal, Table } from 'antd'
import React, { useState } from 'react'

const EditCategory = ({
    isEditModalOpen, setIsEditModalOpen, categories, setCategories
}) => {
    const [editingRow, setEditingRow] = useState({})

    const handleEditCategory = (values) => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/categories/update-category`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...values,
                    categoryId: editingRow._id
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            })
            message.success('Category updated successfully!')
            setIsEditModalOpen(false)
            setCategories(categories.map(category => {
                if (category._id === editingRow._id) {
                    return {
                        ...category,
                        title: values.title
                    }
                }
                return category
            }));
        } catch (error) {
            message.error('Something went wrong!')
            console.log(error)
        }
    }

    const handleDeleteCategory = (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                fetch(`${process.env.REACT_APP_API_URL}/categories/delete-category`, {
                    method: 'DELETE',
                    body: JSON.stringify({ categoryId }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                })
                message.success('Category deleted successfully!')
                setIsEditModalOpen(false)
                setCategories(categories.filter(category => category._id !== categoryId))
            } catch (error) {
                message.error('Something went wrong!')
                console.log(error)
            }
        }
    }

    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'title',
            render: (_, record) => (
                <Form>
                    <Form.Item
                        className='mb-0'
                        name='title'
                    >
                        {record._id === editingRow._id ? (
                            <Input
                                defaultValue={record.title}
                            />
                        ) : (
                            record.title
                        )}
                    </Form.Item>
                </Form>
            )
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div>
                    <Button
                        type="text"
                        className="text-blue-500"
                        onClick={() => setEditingRow(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="text"
                        className="text-green-500"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                    <Button
                        type="text"
                        danger
                        onClick={() => handleDeleteCategory(record._id)}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ]

    return (
        <Modal
            title="Edit Category"
            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            footer={null}
        >
            <Form
                onFinish={handleEditCategory}
            >
                <Table
                    bordered
                    dataSource={categories}
                    columns={columns}
                    rowKey={record => record._id}
                />
            </Form>
        </Modal>
    )
}

export default EditCategory