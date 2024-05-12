import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderid] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [status, setOrderStatus] = useState(""); // Add updateMode state
  const [updateMode, setUpdateMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/orderStatus/");
      setOrders(response.data.orderStatus);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  function sendData(e) {
    e.preventDefault();

    const newOrderStatus = {
      orderID,
      totalAmount,
      paidDate,
      status: status.toLowerCase(),
    };
    axios.post("http://localhost:8090/api/orderStatus/add", newOrderStatus).then(() => {
      alert("Order Status Added");
      fetchOrders();
    }).catch((err) => {
      alert(err);
    });
  }

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/orderStatus/delete/${id}`);
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
  const filteredOrders = orders.filter((order) =>
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container"><br/>
      <h3><u>Add Order Status</u></h3>
      <div className="container my-4 p-4 rounded" style={{ backgroundColor: "#E3E5E7" }}>
      <form onSubmit={sendData}>
        {/* Your form fields */}
        <div className="row mb-3">
          <div className="col-lg-6 col-md col-12">
            <label htmlFor="orderid" className="form-label">
              Order ID:
            </label>
            <input
              type="text"
              className="form-control"
              id="orderId"
              value={orderID}
              onChange={(e) => setOrderid(e.target.value)}
            />
          </div>

          <div className="col-lg-6 col-md col-12">
            <label htmlFor="totalAmount" className="form-label">
              Total Amount:
            </label>
            <input
              type="text"
              className="form-control"
              id="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>

          <div className="col-lg-6 col-md col-12">
            <label htmlFor="paiddate" className="form-label">
              Paid Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="paiddate"
              value={paidDate}
              onChange={(e) => setPaidDate(e.target.value)}
            />
          </div>

          <div className="col-lg-6 col-md col-12">
            <label htmlFor="status" className="form-label">
              Order Status:
            </label>
            <select
              className="form-select"
              id="status"
              value={status}
              onChange={(e) => setOrderStatus(e.target.value)} // Remove toLowerCase()
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="col-12 mt-3">
            <div className="row mb-3 justify-content-center">
              <div className="col-6">
                <button type="submit" className="btn btn-primary d-block mx-auto">
                  {updateMode ? "Update Order" : "Set Order Status"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>

      <hr />

      <h3><u>Order Status Table</u></h3>
<div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search by Order Status"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div><br/>

{/* Order Status Table */}
<table  className="table table-striped">
  <thead>
    <tr className="table-warning">
      <th>Order ID</th>
      <th>Total Amount</th>
      <th>Paid Date</th>
      <th>Order Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredOrders.map((order) => (
      <tr key={order._id}>
        <td>{order.orderID}</td>
        <td>{order.totalAmount}</td>
        <td>{order.paidDate}</td>
        <td>{order.status}</td>
        <td>
          <Link to={`/update/${order.orderID}`} className="btn btn-primary btn-sm me-2">
            Update
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteOrder(order.orderID)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default OrderStatus;