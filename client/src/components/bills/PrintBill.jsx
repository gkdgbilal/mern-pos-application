import { Button, Modal } from 'antd';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Modal
            title="Print Bill"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={800}
        >

            <section
                className='py-20 bg-black'
                ref={componentRef}
            >
                <div className='max-w-5xl mx-auto bg-white px-6'>
                    <article className='overflow-hidden'>
                        <div className="logo my-6">
                            <h2 className='text-4xl font-bold text-slate-700'>
                                LOGO
                            </h2>
                        </div>
                        <div className="bill-details">
                            <div className='grid sm:grid-cols-4 grid-cols-3 gap-12'>
                                <div className='text-md text-slate-500'>
                                    <p className='font-bold text-slate-700'>Bill Detail:</p>
                                    <p className='text-green-600'>
                                        {customer?.customerName}
                                    </p>
                                    <p>Fake Street 123</p>
                                    <p>San Javier</p>
                                    <p>CA 1234</p>
                                </div>
                                <div className='text-md text-slate-500'>
                                    <p className='font-bold text-slate-700'>Bill:</p>
                                    <p>The Boring Company</p>
                                    <p>Tesla Street</p>
                                    <p>CA 1234</p>
                                </div>
                                <div className='text-md text-slate-500'>
                                    <div>
                                        <p className='font-bold text-slate-700'>Bill Number:</p>
                                        <p> 000
                                            {
                                                Math.floor(Math.random() * 100)
                                            }
                                        </p>
                                        <p className='font-bold text-slate-700 mt-2'>Date of Issue:</p>
                                        <p>
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className='text-md text-slate-500 sm:block hidden'>
                                    <div>
                                        <p className='font-bold text-slate-700'>Terms:</p>
                                        <p>5 Days</p>
                                        <p className='font-bold text-slate-700 mt-2'>Due:</p>
                                        <p>2024-03-23</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bill-table-area mt-8">
                            <table className='min-w-full divide-y divide-slate-500 overflow-hidden'>
                                <thead>
                                    <tr className='border-b  border-slate-200'>
                                        <th
                                            scope='col'
                                            className='py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden'
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5  text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden'
                                        >
                                            Title
                                        </th>
                                        <th
                                            colSpan={4}
                                            scope='col'
                                            className='py-3.5  text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden'
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden text-center'
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden text-center'
                                        >
                                            Quantity
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0'
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.cartItems &&
                                        customer.cartItems.map((item, index) => (
                                            <tr
                                                className='border-b  border-slate-200'
                                                key={item._id}
                                            >
                                                <td className='py-4 sm:table-cell hidden'>
                                                    <img
                                                        src={item.img}
                                                        alt=""
                                                        className='w-12 h-12 object-cover hover:opacity-75'
                                                    />
                                                </td>
                                                <td className='py-4 sm:table-cell hidden'>
                                                    <div className='flex flex-col'>
                                                        <span className='font-medium'>Apple</span>
                                                        <span className='sm:hidden inline-block text-xs'>1 unit at {item.price}$</span>
                                                    </div>
                                                </td>
                                                <td className='py-4 sm:hidden' colSpan={4}>
                                                    <div className='flex flex-col'>
                                                        <span className='font-medium'>Apple</span>
                                                        <span className='sm:hidden inline-block text-xs'>1 unit at {item.price}$</span>
                                                    </div>
                                                </td>
                                                <td className='py-4 text-center sm:table-cell hidden'>
                                                    <span>{(item?.price).toFixed(2)}$</span>
                                                </td>
                                                <td className='py-4 sm:text-center text-right sm:table-cell hidden'>
                                                    <span>{item.quantity}</span>
                                                </td>
                                                <td className='py-4 text-end'>
                                                    <span>{(item?.price * item?.quantity).toFixed(2)}$</span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th
                                            className="text-right pt-4 sm:table-cell hidden"
                                            colSpan="4"
                                            scope="row"
                                        >
                                            <span className="font-normal text-slate-700">
                                                Sub Total
                                            </span>
                                        </th>
                                        <th
                                            className="text-left pt-4 sm:hidden"
                                            scope="row"
                                            colSpan="4"
                                        >
                                            <p className="font-normal text-slate-700">Sub Total</p>
                                        </th>
                                        <th className="text-right pt-4" scope="row">
                                            <span className="font-normal text-slate-700">{customer?.subTotal}$</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th
                                            className="text-right pt-4 sm:table-cell hidden"
                                            colSpan="4"
                                            scope="row"
                                        >
                                            <span className="font-normal text-slate-700">Tax {customer?.tax}%</span>
                                        </th>
                                        <th
                                            className="text-left pt-4 sm:hidden"
                                            scope="row"
                                            colSpan="4"
                                        >
                                            <p className="font-normal text-slate-700">Tax 8%</p>
                                        </th>
                                        <th className="text-right pt-4" scope="row">
                                            <span className="font-normal text-red-600">+{(customer?.subTotal * customer?.tax).toFixed(2)}$
                                            </span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th
                                            className="text-right pt-4 sm:table-cell hidden"
                                            colSpan="4"
                                            scope="row"
                                        >
                                            <span className="font-normal text-slate-700">Total</span>
                                        </th>
                                        <th
                                            className="text-left pt-4 sm:hidden"
                                            scope="row"
                                            colSpan="4"
                                        >
                                            <p className="font-normal text-slate-700">Total</p>
                                        </th>
                                        <th className="text-right pt-4" scope="row">
                                            <span className="font-normal text-slate-700">
                                                {customer?.totalAmount}
                                                $
                                            </span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className='py-9'>
                                <div className='border-t pt-9 border-slate-200'>
                                    <p className='text-sm font-light text-slate-700'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis repellat illo quos suscipit perferendis distinctio earum quae soluta et cum ipsum error excepturi consectetur vero reprehenderit, dignissimos, nesciunt libero laborum a nobis! Unde sint eos deleniti nihil nisi illum nam hic sit odio. Suscipit esse dolores aliquid sit mollitia maiores eum, quo minima velit corporis incidunt similique voluptates optio deleniti accusantium? Nulla dolorem quos, odit sit delectus impedit quae repellendus!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <div className='flex justify-end mt-4'>
                <Button
                    type='primary'
                    size='large'
                    onClick={handlePrint}
                >
                    Print
                </Button>
            </div>
        </Modal>
    )
}

export default PrintBill