import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useReactToPrint } from 'react-to-print';

const ShowEmployeeAttendence = React.forwardRef((props, ref) => {
    const [employeesAttendence, setEmployeesAttendence] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8090/EmployeeAttendence')
            .then((response) => {
                setEmployeesAttendence(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        return employeesAttendence.filter((attendance) => {
            return (
                (searchName === '' || attendance.employeeName.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || attendance.date.includes(searchDate))
            );
        });
    };

    const filteredEmployeesAttendence = handleSearch();

    const employeeNames = [...new Set(employeesAttendence.map((attendance) => attendance.employeeName))];

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Employee Attendance List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    const componentRef = useRef();

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', padding: '1rem' }}>
                <BackButton destination="/EmployeeAttendence/allEmployeeAttendence" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Employee Attendance List</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <select
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            style={{ padding: '0.5rem', border: '2px solid #ccc', borderRadius: '4px', marginRight: '0.5rem' }}
                        >
                            <option value="">All Employees</option>
                            {employeeNames.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="month"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            style={{ padding: '0.5rem', border: '2px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div ref={componentRef}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '2px' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>No</th>
                                    <th style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>EmpID</th>
                                    <th style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>employeeName</th>
                                    <th className="max-md:hidden" style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>Date</th>
                                    <th className="max-md:hidden" style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>InTime</th>
                                    <th style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>OutTime</th>
                                    <th style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>Workinghours</th>
                                    <th style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>OThours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployeesAttendence.map((EmployeeAttendence, index) => (
                                    <tr key={EmployeeAttendence._id} style={{ height: '2rem' }}>
                                        <td style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{EmployeeAttendence.EmpID}</td>
                                        <td className="max-md:hidden" style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{EmployeeAttendence.employeeName}</td>
                                        <td className="max-md:hidden" style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{EmployeeAttendence.date}</td>
                                        <td className="max-md:hidden" style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{EmployeeAttendence.InTime}</td>
                                        <td style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{EmployeeAttendence.OutTime}</td>
                                        <td style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{EmployeeAttendence.WorkingHours}</td>
                                        <td style={{ border: '1px solid #708090', borderRadius: '4px', textAlign: 'center' }}>{EmployeeAttendence.OThours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                    <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }} onClick={generatePDF}>
                        Generate PDF
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ShowEmployeeAttendence;
