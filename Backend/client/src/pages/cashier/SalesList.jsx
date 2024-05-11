import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import Sidebar from '../../components/salesManagement/Sidebar';

import "../../styles/supplier/supplierlist.css";




const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/pos/sale');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    // Filter sales records based on search query and selected date
    let filtered = sales;
    if (searchQuery) {
      filtered = filtered.filter(sale => sale.transactionID.includes(searchQuery));
    }
    if (selectedDate) {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.timestamp).toISOString().split('T')[0];
        return saleDate === selectedDate;
      });
    }
    setFilteredSales(filtered);
  }, [searchQuery, selectedDate, sales]);

  const generatePDF = () => {
    // Ensure filteredSales is not empty
    if (filteredSales.length === 0) {
      console.error('No sales data to generate PDF.');
      return;
    }
  
    try {
      const doc = new jsPDF();
      let yPos = 20;
  
      // Add invoice header
      doc.setFontSize(16);
      doc.text('Sales Invoice', 10, yPos);
      yPos += 10;
  
      // Add invoice details
      doc.setFontSize(12);
      doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 10, yPos);
      yPos += 10;
  
      // Add table headers
      const headers = [['Transaction ID', 'Total Amount']];
      const data = filteredSales.map(sale => [sale.transactionID, `$${sale.totalAmount}`]);
  
      // Auto-table generation
      doc.autoTable({
        startY: yPos,
        head: headers,
        body: data,
      });
  
      // Save PDF
      doc.save('sales_invoice.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this sale!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      // If user confirms deletion
      if (result.isConfirmed) {
        // Delete the sale
        await axios.get(`http://localhost:8070/api/pos/delpos/${id}`);
        // Update the sales state
        setSales(sales.filter(sale => sale._id !== id));
        // Show success message
        Swal.fire('Deleted!', 'The sale has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
      // Show error message
      Swal.fire('Error', 'An error occurred while deleting the sale.', 'error');
    }
  };


  return (
    <div className="dashboard">
      <Sidebar/>

      <div className="dashboard-content">
        <div className="itm-conte">
      <h1>Sales Records</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by sales ID"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          placeholder="Filter by date"
        />
        <button onClick={generatePDF}>Export to PDF</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Total Amount</th>
            <th>Products</th>
            <th>Cashier</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.transactionID}</td>
              <td>${sale.totalAmount}</td>
              <td>
              {sale.product ? (
          <ul>
            {sale.product.map(prod => (
              <li key={prod._id}>{prod.name} - ${prod.price} - Qty: {prod.qty}</li>
            ))}
          </ul>
        ) : (
          <span>No products</span>
        )}
              </td>
              <td>{sale.cashier}</td>
              <td>
                    <Link to={`/update/${sale._id}`}>Update</Link> {/* Use Link for navigation */}
                    <button onClick={() => handleDelete(sale._id)}>Delete</button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default SalesList;
