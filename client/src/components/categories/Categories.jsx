import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import './style.css'
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';


const Categories = ({ categories, setCategories, setFilteredProducts, products }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState('All')

    useEffect(() => {
        if (categoryTitle === 'All') {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(product => product.category === categoryTitle))
        }
    }, [categoryTitle, products, setFilteredProducts,])

    return (
        <ul className='flex md:flex-col gap-4 text-center text-lg'>
            {
                categories
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map(category => (
                        <li
                            className={`category-item ${category.title === categoryTitle && '!bg-pink-700'}`}
                            key={category._id}
                            onClick={() => setCategoryTitle(category.title)}
                        >
                            <span>{category.title}</span>
                        </li>
                    ))
            }
            <li
                className='category-item !bg-purple-800 hover:opacity-90'
                onClick={() => setIsAddModalOpen(true)}
            >
                <PlusOutlined />
            </li>
            <li
                className='category-item !bg-orange-800 hover:opacity-90'
                onClick={() => setIsEditModalOpen(true)}
            >
                <EditOutlined />
            </li>
            <AddCategory
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                categories={categories}
                setCategories={setCategories}
            />
            <EditCategory
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                categories={categories}
                setCategories={setCategories}
            />
        </ul>
    )
}

export default Categories