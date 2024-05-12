import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/salesManagement/AdminSidebar';
import { Link } from 'react-router-dom';
import "../../styles/supplier/supplierlist.css";
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import emailjs from 'emailjs-com';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customMessage, setCustomMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplierEmail, setSelectedSupplierEmail] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/sup/suppliers');
        setSuppliers(response.data.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    // Filter suppliers based on status and search query
    const filtered = suppliers.filter(supplier =>
      (supplier.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === 'all' || supplier.status === statusFilter)
    );
    setFilteredSuppliers(filtered);
  }, [searchQuery, statusFilter, suppliers]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this sale!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.get(`http://localhost:8070/api/sup/delsup/${id}`);
        setSuppliers(suppliers.filter(supplier => supplier._id !== id));
        Swal.fire('Deleted!', 'The sale has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      Swal.fire('Error', 'An error occurred while deleting the sale.', 'error');
    }
  };

  const generatePDF = () => {
    // Ensure filteredSuppliers is not empty
    if (filteredSuppliers.length === 0) {
      console.error('No sales data to generate PDF.');
      return;
    }
  
    try {
      const doc = new jsPDF();
      let yPos = 20;
  
      // Add invoice header
      doc.setFontSize(16);
      doc.text('Supplier Invoice', 10, yPos);
      yPos += 10;
  
      // Add invoice details
      doc.setFontSize(12);
      doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 10, yPos);
      yPos += 10;
  
      // Add table headers
      const headers = [['Supplier Name', 'Supplier Email', 'Supplier Phone', 'Supplier Status', 'Supplier Product',]];
      const data = filteredSuppliers.map(supp => [supp.name, supp.email, supp.phone, supp.status, supp.product]);
  
      // Auto-table generation
      doc.autoTable({
        startY: yPos,
        head: headers,
        body: data,
      });
  
      // Save PDF
      doc.save('supplier_invoice.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const sendEmailToSupplier = () => {
    // Your Email.js configuration
    const emailConfig = {
      serviceID: 'service_fjpvjh9', // Your Email.js service ID
      templateID: 'template_1x528d6', // Your Email.js template ID
      userID: 'jm1C0XkEa3KYwvYK0', // Your Email.js user ID
    };

    // Send email
    emailjs.send(
      emailConfig.serviceID,
      emailConfig.templateID,
      {
        to_email: selectedSupplierEmail, // Supplier's email address
        message: customMessage // Custom message
      },
      emailConfig.userID
    ).then((response) => {
      console.log('Email sent successfully:', response);
      setShowModal(false); // Close the modal after sending the email
      Swal.fire('Email Sent!', 'The email has been sent to the supplier.', 'success');
    }).catch((error) => {
      console.error('Error sending email:', error);
      Swal.fire('Error', 'An error occurred while sending the email.', 'error');
    });
  };

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="itm-conte">
          <h2>Supplier Management</h2>
          <div>
            <input
              className="sup-search"
              type="text"
              placeholder="Search by supplier name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className='supp-gen-pdf' onClick={generatePDF}>Export to PDF</button>
            {/* Add status filter dropdown */}
            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <br/>
            <Link to="/addsup" className="add-supplier-btn">Add New Supplier</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.status}</td>
                  <td>{supplier.product}</td>
                  <td>
                    <Link className='sup-update' to={`/upd/${supplier._id}`}>Update</Link> {/* Use Link for navigation */}
                    <button className='sup-del' onClick={() => handleDelete(supplier._id)}>Delete</button>
                    <button className='sup-email' onClick={() => { setShowModal(true); setSelectedSupplierEmail(supplier.email); }}>Send Email</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for sending email */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Send Email</h2>
            <label htmlFor="customMessage">Custom Message:</label><br/><br/>
            <textarea id="customMessage" value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} />
            <br/>
            <br/>
            <button onClick={sendEmailToSupplier}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierList;
