import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import '../Styles/AllOrder.css'
import Sidebar from '../../components/Sidebar';


export default function AllOrder({Toggle}) {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/order");
      console.log("Response data:", response.data); // This will show the entire response object
      setOrders(response.data.orders); // Accessing the 'orders' array from the response data
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Set orders to an empty array in case of error
      setOrders([]);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/order/delete/${id}`);
      // Filter out the deleted order from the local state
      const updatedOrders = orders.filter((order) => order.orderID !== id);
      setOrders(updatedOrders);
      console.log("Order deleted successfully");
      alert("Order deleted successfully"); // Display alert message
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order"); // Display error message
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
         <div>
        <Sidebar Toggle={Toggle} />
      </div>
      <div className="flex-grow-1 px-3"><br/>
      <h3><u>Orders List</u></h3><br/>
      {/* Search input field */}
      
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Supplier Name or Order ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /><br/>
      
      <table className="table table-striped">
        <thead>
          <tr class="table-warning">
            <th>Order ID</th>
            <th>Supplier</th>
            <th>Order Date</th>
            <th>Required Date</th>
            <th>Items</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderID}</td>
              <td>{order.supplier}</td>
              <td>{order.orderDate.substring(0, 10)}</td>
              <td>{order.requiredDate.substring(0, 10)}</td>

              <td>
                <ul>
                  {order.Items.map((item, index) => (
                    <li key={index}>
                      {item.name}   - {item.quantity} - Rs.{item.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <Link to={`/change/${order.orderID}`} className="btn btn-primary btn-sm me-2">
                  Update
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteOrder(order.orderID)} // Pass the correct order ID to deleteOrder function
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}