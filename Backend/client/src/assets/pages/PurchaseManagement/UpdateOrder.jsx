import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateStatus() {
  const { orderID } = useParams();
  const [order, setOrder] = useState({
    orderID: "",
    supplier: "",
    orderDate: "",
    requiredDate: "",
    Items: []
  });

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/order/get/${orderID}`);
      setOrder(response.data.order); // Assuming the response has the order object with the required details
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const updateOrderStatus = async () => {
    try {
      await axios.put(`http://localhost:8090/api/order/update/${orderID}`, order);
      console.log("Order status updated successfully");
      alert("Order successfully updated");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...order.Items];
    updatedItems[index][field] = value;
    setOrder({ ...order, items: updatedItems });
  };

  return (
    <div className="container">
      <h3>Update Order Details</h3>
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
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supplierName" className="form-label">
            Supplier Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="supplierName"
            name="supplierName"
            value={order.supplier}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="orderDate" className="form-label">
            Order Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="orderDate"
            name="orderDate"
            value={order.orderDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="requiredDate" className="form-label">
            Required Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="requiredDate"
            name="requiredDate"
            value={order.requiredDate}
            onChange={handleInputChange}
          />
        </div>
        {/* Item details */}
        {order.Items.map((item, index) => (
          <div className="row" key={index}>
            <div className="mb-3 col-lg-4 col-md-4 col-12">
              <label htmlFor={`itemName${index}`} className="form-label">
                Item Name:
              </label>
              <input
                type="text"
                className="form-control"
                id={`itemName${index}`}
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
              />
            </div>
            <div className="mb-3 col-lg-4 col-md-4 col-12">
              <label htmlFor={`itemQuantity${index}`} className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                id={`itemQuantity${index}`}
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              />
            </div>
            <div className="mb-3 col-lg-4 col-md-4 col-12">
              <label htmlFor={`itemPrice${index}`} className="form-label">
                Price:
              </label>
              <input
                type="number"
                className="form-control"
                id={`itemPrice${index}`}
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateStatus;

