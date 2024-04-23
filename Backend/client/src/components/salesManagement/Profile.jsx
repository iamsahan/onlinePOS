import React from 'react'
import "../../styles/profile.css"
import Itemlist from './Itemlist';

const Profile = ({ selectedItems, removeItemFromProfile, subtotal }) => {
    
  return (
    <div className="containerr">
      <div className="div-wrapper">
        <div className="text-wrapper">Proceed</div>
      </div>
 

      <div className="div">Invoice <hr/></div>
      <ul>
        {selectedItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}{' '}
              <button onClick={() => removeItemFromProfile(index)}>Remove</button>
            </li>
          ))}
      </ul>
      <div className="text-wrapper-2">Sub Total</div>
      <div className="text-wrapper-3">131.2</div>
    </div>
  )
}

export default Profile