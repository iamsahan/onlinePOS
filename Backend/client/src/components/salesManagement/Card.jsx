import React from 'react'
import { cardData } from './Data'

const Card = () => {
  return (
    <div className="card-container">
        {
            cardData.map((item)=>(
                <div className="card">
                    <div className="card-cover"> {item.icon} </div>
                    <div className="card-title"> 
                        <h2>{item.title} </h2>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Card