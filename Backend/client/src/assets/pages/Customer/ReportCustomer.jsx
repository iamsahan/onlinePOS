import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

const ReportCustomer = React.forwardRef((props, ref) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8090/searchCustomer?search=${searchQuery}`
      );
      setCustomers(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(
        "An error occurred while fetching the customers for the search query."
      );
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

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Customer List',
    onAfterPrint: () => alert('Data saved in PDF'),
  });

  return (
    <div ref={ref}>
      <div className="p-4">
        <BackButton destination='/customers/allCustomers' /> 
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Customer List</h1>
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
        {loading ? (
          <Spinner />
        ) : (
          <>
            <table className="w-full border-separate border-spacing-2" ref={componentRef}>
              <thead>
                <tr>
                  <th className="border border-gray-400 rounded-md">Customer ID</th>
                  <th className="border border-gray-400 rounded-md">Date</th>
                  <th className="border border-gray-400 rounded-md">First Name</th>
                  <th className="border border-gray-400 rounded-md">Last Name</th>
                  <th className="border border-gray-400 rounded-md">NIC</th>
                  <th className="border border-gray-400 rounded-md">Phone</th>
                  <th className="border border-gray-400 rounded-md">Email</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customerData, index) => (
                  <tr key={customerData._id} className="h-8">
                    <td className="border border-gray-400 rounded-md text-center">{customerData.cusID}</td>
                    <td className="border border-gray-400 rounded-md text-center">{customerData.date}</td>
                    <td className="border border-gray-400 rounded-md text-center">{customerData.firstName}</td>
                    <td className="border border-gray-400 rounded-md text-center">{customerData.lastName}</td>
                    <td className="border border-gray-400 rounded-md text-center">{customerData.NIC}</td>
                    <td className="border border-gray-400 rounded-md text-center">{customerData.phone}</td>
                    <td className="border border-gray-400 rounded-md text-center">{customerData.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-8">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                Generate PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default ReportCustomer;
