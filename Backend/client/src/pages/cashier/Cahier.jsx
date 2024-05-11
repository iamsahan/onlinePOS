import React from 'react'
import Sidebar from '../../components/salesManagement/Sidebar'
import Content from '../../components/salesManagement/Content'
import Card from '../../components/salesManagement/Card'
import ContentHeader from '../../components/salesManagement/ContentHeader'
import Profile from '../../components/salesManagement/Profile'
import "../../styles/cashier.css"

import { jsPDF } from "jspdf";


import Itemlist from '../../components/salesManagement/Itemlist'

const Cashier = () => {
    const [selectedItems, setSelectedItems] = React.useState([]);
  
    const addItemToProfile = (item) => {
      setSelectedItems([...selectedItems, item]);
    };
  
    const removeItemFromProfile = (index) => {
      const newItems = [...selectedItems];
      newItems.splice(index, 1);
      setSelectedItems(newItems);
    };
  
    const calculateSubtotal = () => {
      return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    return (
      <div className="dashboard">
     <Sidebar />
        <div className="dashboard-content">
            <div className="content">
            <ContentHeader />
            <div className="itm-cont">
            <Card />
            <Itemlist addItemToProfile={addItemToProfile} />
            </div>
            
            </div>
            <div className="prof">
                <div className='prof-head'>
                    <p className="dte-tme"> Cashier1 
                        <img src='#a'></img>
                      </p>
                </div>
            <Profile
            selectedItems={selectedItems}
            removeItemFromProfile={removeItemFromProfile}
            subtotal={calculateSubtotal()}
            />
            </div>
            
        </div> 
      </div>
    )
  }
  
  export default Cashier;