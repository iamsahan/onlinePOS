import React from 'react'
import Sidebar from './components/salesManagement/Sidebar'
import Content from './components/salesManagement/Content'
import Card from './components/salesManagement/Card'
import ContentHeader from './components/salesManagement/ContentHeader'
import Profile from './components/salesManagement/Profile'

import {BrowserRouter as Router} from 'react-router-dom'
import './App.css'
import Itemlist from './components/salesManagement/Itemlist'

const App = () => {
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
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };
  
  return (
    <div className="dashboard">
   
   
   <div className="dashboard-content">
   <Sidebar />
   
      <div className="content">
      <ContentHeader />
        <Card />
        <Itemlist addItemToProfile={addItemToProfile} />
      </div>
      <Profile
        selectedItems={selectedItems}
        removeItemFromProfile={removeItemFromProfile}
        subtotal={calculateSubtotal()}
      />
   </div> 
    </div>
  )
}

export default App;