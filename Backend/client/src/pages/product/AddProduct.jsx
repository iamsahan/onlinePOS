import React, { useState } from 'react'
import Sidebar from '../../components/salesManagement/Sidebar';
import "../../styles/product/addproduct.css";
import axios from 'axios';

const AddProduct = () => {

    const [formData, setFormData] = useState({
        // ptype: '',
        // name: '',
        // barcode: '',
        // sku: '',
        // description: '',
        // cost: '',
        // markup: '',
        // retail: '',
        // tax: '',
        // sell: '',
        // amount: '',
        // exp: '',
        // mfd: '',
        // istrack: '',
        // sup: '',
    })

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const token = localStorage.getItem('token');
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8070/api/itm/additem', formData, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                }});
            console.log(formData);
            swal("Good job!", "Supplier Added Successfully!", "success");
            console.log(res);
          } catch (err) {
            console.error('Error adding supplier:', err);
          }
    }

  return (
    <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
            <div className="itm-conte">
                <h2>Product Management</h2>

                <div className="form-back">
                    <form onSubmit={handleSubmit}>
                    <div className="set">
                            <h3 className='set-title'>Product Type <hr/></h3>
 
                            <div className="same-row">
                                    <input type="radio"  name="ptype" value="HTML" onChange={handleChange}/>
                                    <label >Simple product, no variants</label>
                                    <input type="radio"  name="ptype" value="CSS" onChange={handleChange}/>
                                    <label >Product with variants</label>
                                    <input type="radio"  name="ptype" value="JavaScript" onChange={handleChange}/>
                                    <label >Composite products</label>
                            </div>
                        </div>  
                        <div className="set">
                            <h3 className='set-title'>Primary Details <hr/></h3>
                         
                            <label className='label required'>Name </label> <br />
                            <input type="text" className='p-name' placeholder="Product Name" name="name" onChange={handleChange} required/>

                            <div className="same-row">
                            <input type="text" className='p-code' placeholder="Barcode" name="barcode" onChange={handleChange} required/>
                            <input type="text" className='p-code' placeholder="SKU" name="sku" onChange={handleChange} required/>
                            </div>

                            <label className='label required'>Description </label> <br />
                            <textarea className='p-description' name="description" onChange={handleChange}>Some text...</textarea>
                        </div>  
                        <div className="set">
                            <h3 className='set-title'>Pricing <hr/></h3>
                            <table className='pri-table'>
                                <tr>
                                    <td>Cost Price</td>
                                    <td>Mark-up%</td>
                                    <td>Retail (Ex. Tax)</td>
                                    <td>Tax rate</td>
                                    <td>Retail price (Inc. Tax)</td>    
                                </tr>
                                <tr>
                                    <td><hr /></td>
                                    <td><hr /></td>
                                    <td><hr /></td>
                                    <td><hr /></td>
                                    <td><hr /></td>
                                </tr>
                                
                                <tr>
                                    <td><input type="text" className='t-cost' placeholder="SKU" name="cost" onChange={handleChange} required/></td>
                                    <td><input type="text" className='t-cost' placeholder="SKU" name="markup" onChange={handleChange} required/></td>
                                    <td><input type="text" className='t-cost' placeholder="SKU" name="retail" onChange={handleChange} required/></td>
                                    <td><input type="text" className='t-cost' placeholder="SKU" name="tax" onChange={handleChange} required/></td>
                                    <td><input type="text" className='t-cost' placeholder="SKU" name="sell" onChange={handleChange} required/></td>
                                </tr>
                            </table>
                        </div>  

                        <div className="set">
                            <h3 className='set-title'>Inventory Details <hr/></h3>
                         
                        

                            <div className="same-row">
                            <label className='label required'>No Of Items </label> <br />
                            <input type="number" className='i-num' placeholder="Barcode" name="amount" onChange={handleChange} required/>
                            <label className='label required'>Exp Date </label> <br />
                            <input type="date" className='i-date' placeholder="SKU" name="exp" onChange={handleChange} required/>
                            <label className='label required'>Mf Date </label> <br />
                            <input type="date" className='i-date' placeholder="SKU" name="mfd" onChange={handleChange} required/>
                            </div>

                            <input type="checkbox" id="vehicle1" name="istrack" value="true" onChange={handleChange}/>
                            <label > Enable inventory tracking for this product</label><br></br>
                        </div>  

                        <div className="set">
                            <h3 className='set-title'>Supplier Details <hr/></h3>
                         
                            <label className='label required'>Name </label> <br />
                            <input type="text" className='p-name' placeholder="Product Name" name="sup" onChange={handleChange} required/>

                            
                        </div>  
                        <button type="submit" className="btn btn-prd">Submit</button>
                    </form>   
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddProduct;
