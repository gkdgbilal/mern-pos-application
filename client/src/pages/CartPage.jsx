import { Button, Card, Input, message, Popconfirm, Space, Table } from 'antd'
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateBill from '../components/cart/CreateBill';
import Header from '../components/header/Header'
import { PlusCircleOutlined, MinusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';
import Highlighter from 'react-highlight-words';

const CartPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const { cartItems, total, tax } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'img',
            key: 'img',
            width: 125,
            render: (img) => <img src={img} alt="" className='w-full h-20 object-cover' />
        },
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>{price.toFixed(2)}$</span>,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <div className='flex items-center'>
                    <Button
                        type='primary'
                        size='small'
                        className='w-full flex items-center justify-center !rounded-full'
                        icon={<PlusCircleOutlined />}
                        onClick={() => dispatch(increaseQuantity(record))}
                    />
                    <span className='font-bold w-6 inline-block text-center'>{quantity}</span>
                    <Button
                        type='primary'
                        size='small'
                        className='w-full flex items-center justify-center !rounded-full'
                        icon={<MinusCircleOutlined />}
                        onClick={() => {
                            if (quantity === 1) {
                                if (window.confirm('Are you sure you want to remove this item from cart?')) {
                                    dispatch(removeFromCart(record))
                                    message.success('Item removed from cart')
                                }
                            } else {
                                dispatch(decreaseQuantity(record))
                            }
                        }}
                    />
                </div>
            )
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => <span>{(record.quantity * record.price).toFixed(2)}$</span>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => <Popconfirm
                title='Are you sure you want to remove this item from cart?'
                onConfirm={() => {
                    dispatch(removeFromCart(record))
                    message.success('Item removed from cart')
                }}
                okText='Yes'
                cancelText='No'
            >
                <Button
                    type='link'
                    danger
                >
                    Remove
                </Button>
            </Popconfirm>
        },
    ];

    return (
        <>
            <Header />
            <div className='px-6'>
                <Table
                    dataSource={cartItems}
                    columns={columns}
                    bordered
                    pagination={false}
                    rowKey={record => record._id}
                    scroll={{
                        x: 1200,
                        y: 300
                    }}
                />
                <div className="cart-total flex justify-end mt-4">
                    <Card className='w-72'>
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
                        <Button
                            className='mt-4 w-full'
                            size="large"
                            type='primary'
                            onClick={() => setIsModalOpen(true)}
                            disabled={cartItems.length === 0}
                        >
                            Checkout
                        </Button>
                    </Card>
                </div>
            </div>
            <CreateBill
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}

export default CartPage