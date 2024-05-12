import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams for accessing route parameters

function UpdateStatus() {
  const { orderID } = useParams(); // Get the orderId from route parameters
  const [order, setOrder] = useState({
    orderID: "",
    totalAmount: "",
    paidDate: "",
    status: "pending"
  });
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/orderStatus/get/${orderID}`);
      setOrder(response.data.orderStatus);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async () => {
    try {
      await axios.put(`http://localhost:8090/api/orderStatus/update/${orderID}`, order);
      console.log("Order status updated successfully");
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("Error updating order status:", error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h3>Update Order Status</h3>
      <form onSubmit={updateOrderStatus}>
        <div className="mb-3">
          <label htmlFor="orderId" className="form-label">
            Order ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="orderId"
            name="orderID"
            value={order.orderID}
            onChange={handleInputChange}
            disabled // Disable input field for orderId
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount:
          </label>
          <input
            type="text"
            className="form-control"
            id="totalAmount"
            name="totalAmount"
            value={order.totalAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paidDate" className="form-label">
            Paid Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="paidDate"
            name="paidDate"
            value={order.paidDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Order Status:
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={order.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateStatus;
