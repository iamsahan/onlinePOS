import salesModel from '../models/salesModel.js';
import mongoose from 'mongoose';

const newsalesController = async (req, res) => {
    try {
        const transaction = new salesModel(req.body);
        await transaction.save();

        return res.status(201).send({
            sucess: true,
            message: "Transaction Successfully",
            transaction
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Error in transaction API",
            error
        });
    }
};

// Route to get all sales records
const getallSale = async (req, res) => {
    try {
        const sales = await salesModel.find();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getoneSale = async (req, res) => {
    try {
        const transaction = await salesModel.findOne({ transactionID: req.params.tid });

        if (!transaction) {
            return res.status(404).send({
                success: false,
                message: "Transaction Not Found!",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                transaction
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Error in Fetch API!",
            error
        })
    }
};

const getSalesById = async (req, res) => {
    try {
        const sale = await salesModel.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }
        res.status(200).json({ success: true, data: sale });
    } catch (error) {
        console.error('Error fetching supplier:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteSale = async (req, res) => {
    try {
        await salesModel.findByIdAndDelete(req.params.ssid);
        res.status(200).send({
            success: true,
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete API!",
            error: error.message
        });
    }
};

const updateSale = async (req, res) => {
    try {
        const { status } = req.body;


        const updatedSales = await salesModel.findByIdAndUpdate(
            req.params.id, 
            { status }, // Updated data
            { new: true } // Return updated document
        );

        if (!updatedSales) {
            return res.status(404).json({ success: false, message: 'Supplier not found',transactionID });
        }

        res.status(200).json({ success: true, data: updatedSales });
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ success: false, message: 'Internal server error', transactionID });
    }

};

const upsale = async (req, res) => {
    const { id } = req.params.id;
    const { updatedData } = req.body;
    const update = { status: "returned" };

    try {
        const updatedSale = await Sales.findByIdAndUpdate(id, update, { new: true });
        res.json(updatedSale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { newsalesController, getoneSale, getSalesById, deleteSale, updateSale, getallSale, upsale };
