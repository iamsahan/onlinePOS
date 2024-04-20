import React from 'react'
import ContentHeader from './ContentHeader'
import "../styles/content.css"
import Card from './Card'
import Itemlist from './Itemlist'

const Content = () => {

  const [selectedItems, setSelectedItems] = React.useState([]);
  
  const addItemToProfile = (item) => {
    setSelectedItems([...selectedItems, item]);
  };
  return (
    <div className="content">
        <ContentHeader />
        <Card />
        <Itemlist addItemToProfile={addItemToProfile} />
    </div>
  )
}

export default Content