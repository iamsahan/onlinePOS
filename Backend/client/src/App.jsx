import React from 'react'

import {BrowserRouter, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import './App.css'

import Cashier from './pages/cashier/Cahier'
import SalesList from './pages/cashier/SalesList'
// import UpdateSale from './pages/UpdateSale'
import AddSupplier from './pages/supplier/AddSupplier'
import SupplierList from './pages/supplier/SupplierList'
import UpdateSupplier from './pages/supplier/UpdateSupplier'

const App = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cashier' element={<Cashier />}></Route>
        <Route path='/sales' element={<SalesList />}></Route>
        {/* <Route path='/update/:id' element={<UpdateSale />}></Route> */}

        <Route path='/addsup' element={<AddSupplier />}></Route>
        <Route path='/suplist' element={<SupplierList />}></Route>
        <Route path='/upd/:id' element={<UpdateSupplier />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;