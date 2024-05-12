import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

const ReportReturn = React.forwardRef((props, ref) => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8090/searchReturn?search=${searchQuery}`
      );
      setReturns(response.data.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching return:", error);
      setError(
        "An error occurred while fetching the return for the search query."
      );
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

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Return List',
    onAfterPrint: () => alert('Data saved in PDF'),
  });

  return (
    <div ref={ref}>
      <div className="p-4">
        <BackButton destination='/returns/allReturns' /> 
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Return List</h1>
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
                  <th className="border border-slate-600 rounded-md">Return ID</th>
                  <th className="border border-slate-600 rounded-md">Return Date</th>
                  <th className="border border-slate-600 rounded-md">Return Item Name</th>
                  <th className="border border-slate-600 rounded-md">Reason</th>
                  <th className="border border-slate-600 rounded-md">Customer Name</th>
                  <th className="border border-slate-600 rounded-md">Customer Address</th>
                  <th className="border border-slate-600 rounded-md">Phone Number</th>
                  <th className="border border-slate-600 rounded-md">Return Status</th>
                </tr>
              </thead>
              <tbody>
                {returns.map((returnData, index) => (
                  <tr key={returnData._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">{returnData.returnID}</td>
                    <td className="border border-slate-700 rounded-md text-center">{returnData.returnDate}</td>
                    <td className="border border-slate-700 rounded-md text-center">{returnData.returnItemN}</td>
                    <td className="border border-slate-700 rounded-md text-center">{returnData.reason}</td>
                    <td className="border border-slate-700 rounded-md text-center">{returnData.cusName}</td>
                    <td className="border border-slate-700 rounded-md text-center">{returnData.cAddress}</td>
                    <td className="border border-slate-700 rounded-md text-center">{returnData.phoneNO}</td>
                    <td className="border border-slate-700 rounded-md text-center">{returnData.rStatus}</td>
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

export default ReportReturn;