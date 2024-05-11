import React from 'react'
import ContentHeader from './ContentHeader'
import "../../styles/content.css"
import Card from './Card'
import Itemlist from './Itemlist'

const Content = () => {

  const [selectedItems, setSelectedItems] = React.useState([]);

  
  return (
    <div className="content">
        <ContentHeader />
        <Card />
        
    </div>
  )
}

export default Content