import React, { useState } from 'react';
import "../../styles/itemlist.css";
import { itemData } from './Data';
import { BiSearch } from 'react-icons/bi';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import BarcodeScanner from './BarcodeScanner';

const Itemlist = ({ addItemToProfile }) => {
    const [detail, setDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isCameraOpen, setIsCameraOpen] = useState(true); // State to manage camera visibility
    const [searchValue, setSearchValue] = useState(""); // State to store search box value

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

    const handleBarcodeDetected = (barcode) => {
        // Set the scanned barcode as the search box value
        setSearchValue(barcode);
        // Close the camera after successful scan
        setIsCameraOpen(true); 
    };

    const handleSearch = () => {
        // Perform search based on the search box value
        const searchResult = itemData.filter(item => item.code === searchValue);
        if (searchResult.length > 0) {
            // If found, navigate to the detail page of the first matching item
            detailPage(searchResult[0]);
        } else {
            // If not found, show an alert or handle the case as needed
            alert("Item not found!");
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
                                Code : {detail.code}
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
                        {isCameraOpen && <BarcodeScanner onDetected={handleBarcodeDetected} />}
                        <input 
                            type="text" 
                            placeholder="Enter Barcode Here" 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)} 
                        />
                        <button onClick={handleSearch}><BiSearch /></button>
                    </div>
                </div>
                <div className="list-container">
                    {itemData.map((item) => (
                        <div className="container" onClick={() => detailPage(item)} key={item.id}>
                            <img className="image" alt="Product" src={item.image} />
                            <div className="text-wrapper">{item.name}<hr/></div>
                            <p className="category-soapunit">
                                Category : {item.category}
                                <br />
                                Code : {item.code}
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
