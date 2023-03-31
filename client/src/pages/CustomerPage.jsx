import { Table, Input, Space, Button, Spin } from 'antd';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/header/Header'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';

const CustomerPage = () => {
    const [billItems, setBillItems] = useState([])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
            ...getColumnSearchProps('customerName'),
        },
        {
            title: 'Phone Number',
            dataIndex: 'customerPhoneNumber',
            key: 'customerPhoneNumber',
            ...getColumnSearchProps('customerPhoneNumber'),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => <span>{new Date(createdAt).toLocaleDateString()}</span>
        },
    ];

    const getBills = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/bills/get-all`)
            const parseData = await res.json();
            setBillItems(parseData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getBills()
    }, []);

    return (
        <>
            <Header />
            <h1 className='text-4xl text-center font-bold mb-4'>Customers</h1>
            {
                billItems.length > 0 ? (
                    <div className='px-6'>
                        <Table
                            dataSource={billItems}
                            columns={columns}
                            bordered
                            pagination={false}
                            scroll={{
                                x: 1000,
                                y: 300
                            }}
                            rowKey={(record) => record._id}
                        />
                    </div>
                ) :
                    (
                        <Spin
                            size='large'
                            className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                        />
                    )
            }

        </>
    )
}

export default CustomerPage