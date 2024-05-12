import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { Sidebar } from '../Sidebar'; // Make sure Sidebar is correctly imported and styled

import Header from './Header';

function ShowReturn() {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8090/searchReturn?search=${searchQuery}`
            );
            setReturns(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching return:", error);
            setLoading(false);
        } 
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8090/returns')
            .then((response) => {
                setReturns(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const applySearchFilter = (returnData) => {
        return (
            returnData.returnID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.returnDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.returnItemN.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.cusName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.cAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.phoneNO.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.rStatus.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredReturns = returns.filter(applySearchFilter);

    return (
        <div>
           
            <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>Return List</h1>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter search query"
                            style={{ marginRight: '0.5rem', border: '1px solid #ccc', padding: '0.5rem' }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer' }}
                        >
                            Search
                        </button>

                        


                    </div>

                    
                </div>


                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>No</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Return ID</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Return Date</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Return Item Name</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Reason</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Customer Name</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Customer Address</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Phone Number</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Return Status</th>
                                <th style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReturns.map((returnData, index) => (
                                <tr key={returnData._id} style={{ height: '2rem' }}>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.returnID}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.returnDate}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.returnItemN}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.reason}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.cusName}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.cAddress}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.phoneNO}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>{returnData.rStatus}</td>
                                    <td style={{ border: '1px solid #6c757d', borderRadius: '4px', padding: '0.5rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                            <Link to={`/returns/details/${returnData._id}`}>
                                                Info
                                            </Link>
                                            <Link to={`/returns/edit/${returnData._id}`}>
                                                Edit
                                            </Link>
                                            <Link to={`/returns/delete/${returnData._id}`}>
                                                Delete
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
       
            )
}

export default ShowReturn;
