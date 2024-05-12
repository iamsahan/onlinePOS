import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import { useReactToPrint } from 'react-to-print';

const ReportEmployee = React.forwardRef((props, ref) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8090/searchEmployee?search=${searchQuery}`);
            setEmployees(response.data.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error("Error fetching employee:", error);
            setError("An error occurred while fetching the employee for the search query.");
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8090/employees')
            .then((response) => {
                setEmployees(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Employee List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    const applySearchFilter = (employee) => (
        employee.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredEmployee = employees.filter(applySearchFilter);

    return (
        <div ref={ref}>
            <div className="p-4">
                <BackButton destination='/employees/allEmployee' />
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl my-8">Employee List</h1>
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
                                    <th className="border border-slate-600 rounded-md">No</th>
                                    <th className="border border-slate-600 rounded-md">EmpID</th>
                                    <th className="border border-slate-600 rounded-md">employeeName</th>
                                    <th className="border border-slate-600 rounded-md max-md:hidden">role</th>
                                    <th className="border border-slate-600 rounded-md max-md:hidden">phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployee.map((employee, index) => (
                                    <tr key={employee._id} className="h-8">
                                        <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{employee.EmpID}</td>
                                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">{employee.employeeName}</td>
                                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">{employee.role}</td>
                                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">{employee.phone}</td>
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

export default ReportEmployee;
