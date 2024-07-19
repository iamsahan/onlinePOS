import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import AdminSidebar from "../../components/salesManagement/Sidebar";
import swal from 'sweetalert';

const FormContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  width: 100%;

  @media (min-width: 600px) {
    width: 30%;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 70%;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ItemGroup = styled.div`
  
  background-color: #dddddd;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 10px;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const AddSupplier = () => {
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };

  const navigate = useNavigate();

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);

  const [form, setForm] = useState({
    productName: '',
    sku: '',
    barcode: '',
    supplierCode: '',
    customField: '',
    description: '',
    trackInventory: false,
    costPrice: '',
    markup: '',
    retailPrice: '',
    taxRate: 'VAT',
    pointOfSale: true,
    eCommerce: false,
    productType: '',
    supplier: '',
    brand: '',
    tags: '',
    season: '',
    additionalLoyaltyPoints: 0,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8070/api/sup/addsupplier', form);
      console.log(res.data);
      swal("Good job!", "Supplier Added Successfully!", "success");
      navigate('/suplist');
    } catch (err) {
      console.error('Error adding supplier:', err.response.data);
    }
  };

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="itm-conte">
          <h2 className='btext'>Add New Product</h2>
          <div className="form-back">
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <ItemGroup>
                  <FormGroup>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input type="text" id="productName" name="productName" value={form.productName} onChange={handleChange} required />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input type="text" id="barcode" name="barcode" value={form.barcode} onChange={handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="supplierCode">Supplier Code</Label>
                    <Input type="text" id="supplierCode" name="supplierCode" value={form.supplierCode} onChange={handleChange} />
                  </FormGroup>

                  <FormGroup>
                  <Label htmlFor="description">Description</Label>
                  <TextArea id="description" name="description" value={form.description} onChange={handleChange}></TextArea>
                </FormGroup>
                </ItemGroup>

                

                <ItemGroup>
                <FormGroup>
                  <Label htmlFor="costPrice">Cost Price</Label>
                  <Input type="number" id="costPrice" name="costPrice" value={form.costPrice} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="markup">Markup %</Label>
                  <Input type="number" id="markup" name="markup" value={form.markup} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="retailPrice">Retail Price (Ex. Tax)</Label>
                  <Input type="number" id="retailPrice" name="retailPrice" value={form.retailPrice} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="taxRate">Tax Rate</Label>
                  <Select id="taxRate" name="taxRate" value={form.taxRate} onChange={handleChange}>
                    <option value="VAT">VAT</option>
                    <option value="GST">GST</option>
                    <option value="None">None</option>
                  </Select>
                </FormGroup>
                  
                </ItemGroup>

                <FormGroup>
                  <CheckboxLabel>
                    <Input type="checkbox" name="pointOfSale" checked={form.pointOfSale} onChange={handleChange} /> Point of Sale
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Input type="checkbox" name="eCommerce" checked={form.eCommerce} onChange={handleChange} /> E-commerce
                  </CheckboxLabel>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="productType">Product Type</Label>
                  <Input type="text" id="productType" name="productType" value={form.productType} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input type="text" id="supplier" name="supplier" value={form.supplier} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="brand">Brand</Label>
                  <Input type="text" id="brand" name="brand" value={form.brand} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="tags">Tags</Label>
                  <Input type="text" id="tags" name="tags" value={form.tags} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="season">Season</Label>
                  <Input type="text" id="season" name="season" value={form.season} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="additionalLoyaltyPoints">Additional Loyalty Points</Label>
                  <Input type="number" id="additionalLoyaltyPoints" name="additionalLoyaltyPoints" value={form.additionalLoyaltyPoints} onChange={handleChange} />
                </FormGroup>

                <Button type="submit">Save</Button>
              </form>
            </FormContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
