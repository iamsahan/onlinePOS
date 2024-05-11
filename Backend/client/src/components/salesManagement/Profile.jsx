import React from 'react'
import "../../styles/profile.css"
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { jsPDF } from "jspdf";
import swal from 'sweetalert';

const Profile = ({ selectedItems, removeItemFromProfile, subtotal }) => {
    
  const [paymentAmount, setPaymentAmount] = React.useState('');
  const [change, setChange] = React.useState(0);
  const [pop, setPop] = React.useState(0);

  const doc = new jsPDF();

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const handleCalculateChange = () => {
    console.log(selectedItems)
    const payment = parseFloat(paymentAmount);
    setPop(1);
    if (!isNaN(payment) && payment >= subtotal) {
      const changeAmount = payment - subtotal;
      setChange(changeAmount.toFixed(2));
    } else {
      setChange(null);
    }
  };

  const orderData = {
    transactionID: generateTransactionID(), // Function to generate a unique transaction ID
    timestamp: new Date(),
    cashier: "John Doe", // Example cashier name
    product: selectedItems.map(item => ({
      name: item.name,
      price: item.price,
      qty: item.quantity
    })),
    totalAmount: subtotal,
    customerID: "customer123",
    billID: generateBillID(), // Function to generate a unique bill ID
    paymentMethod: "cash", // Example payment method, you can change this
    status: "completed" // Initial status is set to "compleated"
  };

  function generateTransactionID() {
    // Logic to generate a unique transaction ID
    return "TRX-" + Math.random().toString(36).substr(2, 9);
  }
  
  // Function to generate a unique bill ID
  function generateBillID() {
    // Logic to generate a unique bill ID
    return "BILL-" + Math.random().toString(36).substr(2, 9);
  }

  function genReport(){
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  }
  
  // Function to place order
  const placeOrder = async () => {
    console.log(orderData)
    try {
      const response = await axios.post('http://localhost:8070/api/pos/add', orderData);
      console.log(response.data); 
      swal("Good job!", "Sales Created Successfully!", "success");// Handle success response
      
      // Optionally, display a success message to the user
    } catch (error) {
      console.error('Error placing order:', error); // Handle error
      // Optionally, display an error message to the user
      swal("Sorry Attempt Failed!", "You clicked the button!", "error");
    }

    setTimeout(() => {
      window.location.reload(); // Refresh the page after 2 seconds
    }, 2000);
  };


  return (
    <div className="containerr">
      
      <h2>Invoice</h2>
      <p>--------------------------------------------------------------------------</p>
      <div className="con-data">
        <table>
          <thead>
            <tr>
              <th className='tname'>Name</th>
              <th className='tprice'>Price</th>
              <th className='tqty'>Qty</th>
              <th className='ttotal'>Total</th>
              <th className='taction'>Action</th>
            </tr>
          </thead>
          <hr/>
          <tbody>
            {selectedItems.map((item, index) => (
              <>
                <tr key={index}>
                  <td className='dta'>{item.name}</td>
                  <td className='dta'>${item.price}</td>
                  <td className='dta'>{item.quantity}</td>
                  <td className='dta'>${item.price * item.quantity}</td>
                  <td><button className='del' onClick={() => removeItemFromProfile(index)}>DEL</button></td>
                </tr><hr />
              </>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-wrapper-1">------------------------------------------------------------</div>
      <div className="text-wrapper-2">Sub Total:</div>
      <div className="text-wrapper-3">${subtotal}</div>
      <div className="text-wrapper-4">------------------------------------------------------------</div>
      
      <Popup contentStyle={{width: "300px", borderRadius: "10px", height:"200px"}} trigger={<button className='cal-btn'> Place Order</button>} position="top center">
      <div className="cal">
        <button onClick={handleCalculateChange} >Calculate Change</button>

        {pop == 1 && (
          <div className="cal-change">
            <label>Enter Payment Amount:</label>
            <input type="number" pattern="[0-9]*" // Allow only numbers
              title="Please enter only numbers" value={paymentAmount} onChange={handlePaymentAmountChange} />
            <button onClick={() => setChange(null)}>Clear</button>
            <div>
              <strong>Change:</strong> ${change}
            </div>
          </div>
        )}

        <button onClick={placeOrder}>Place Order</button>
        <button onClick={genReport}>report</button>
      </div>  
      </Popup>

        
    </div>
  
  )
}

export default Profile