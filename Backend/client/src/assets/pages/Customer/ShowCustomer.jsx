import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';


function ShowCustomer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8090/searchCustomer?search=${searchQuery}`
            );
            setCustomers(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching customers:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8090/customers')
            .then((response) => {
                setCustomers(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const applySearchFilter = (customerData) => {
        return (
            customerData.cusID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerData.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerData.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerData.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerData.NIC.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerData.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerData.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredCustomers = customers.filter(applySearchFilter);

    return (
        <div>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Customer List</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter search query"
                            className="mr-2 border border-gray-400 p-2"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <Link to='/customers/create'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Customer
                        </button>
                    </Link>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <Link to='/customers/reportCustomer'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Report
                        </button>
                    </Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>No</th>
                                <th className='border border-slate-600 rounded-md'>Customer ID</th>
                                <th className='border border-slate-600 rounded-md'>Date</th>
                                <th className='border border-slate-600 rounded-md'>First Name</th>
                                <th className='border border-slate-600 rounded-md'>Last Name</th>
                                <th className='border border-slate-600 rounded-md'>NIC</th>
                                <th className='border border-slate-600 rounded-md'>Phone</th>
                                <th className='border border-slate-600 rounded-md'>Email</th>
                                <th className='border border-slate-600 rounded-md'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customerData, index) => (
                                <tr key={customerData._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{customerData.cusID}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{customerData.date}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{customerData.firstName}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{customerData.lastName}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{customerData.NIC}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{customerData.phone}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{customerData.email}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/customers/details/${customerData._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/customers/edit/${customerData._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/customers/delete/${customerData._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default ShowCustomer;
