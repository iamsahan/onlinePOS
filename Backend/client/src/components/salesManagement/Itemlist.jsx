import React, { useState } from 'react';
import "../styles/itemlist.css";
import { itemData } from './Data';
import { BiSearch } from 'react-icons/bi';

const Itemlist = ({ addItemToProfile }) => {
    const [detail, setDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const detailPage = (item) => {
        setDetail(item);
    };

    const closePage = () => {
        setDetail(null);
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleAddItem = () => {
        if (detail) {
            addItemToProfile({ ...detail, quantity });
            closePage();
            setQuantity(1);
        }
    };

    return (
        <>
            {detail && (
                <div className="detail_container">
                    <div className="detail_content">
                        <div className="detail_cont">
                            <div className="detail_info">
                                <button onClick={closePage}>close</button>
                                <div className="img_box">
                                    <img src={detail.image} alt="Product" />
                                </div>
                                <div className="text-wrapper">{detail.name}</div>
                                <p className="category-soapunit">
                                    <hr/>
                                    Category : {detail.category}
                                    <br />
                                    Unit Price : {detail.unitPrice}
                                    <br />
                                    Sales Price : {detail.salesPrice}
                                </p>
                                <label>
                                    Quantity:
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min={1}
                                    />
                                </label>
                                <button onClick={handleAddItem}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="item-list">
                <div className="list-header">
                    <h2>Products</h2>
                </div>
                <div className="header-activity">
                    <div className="search-box">
                        <input type="text" name="" id="" placeholder='Enter Barcode Here' />
                        <BiSearch className="icon"/>
                    </div>
                </div>
                <div className="list-container">
                    {itemData.map((item) => (
                        <div className="container" onClick={() => detailPage(item)} key={item.id}>
                            <img className="image" alt="Product" src={item.image} />
                            <div className="text-wrapper">{item.name}</div>
                            <p className="category-soapunit">
                                <hr/>
                                Category : {item.category}
                                <br />
                                Unit Price : {item.unitPrice}
                                <br />
                                Sales Price : {item.salesPrice}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Itemlist;
