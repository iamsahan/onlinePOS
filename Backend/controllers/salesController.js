const salesModel = require('../models/salesModel');
const mongoose = require('mongoose');

const newsalesController = async(req, res) => {
    try {
        const transaction = new salesModel(req.body);
        await transaction.save();

        return res.status(201).send({
            sucess : true,
            message : "Transaction Sucessfully",
            transaction
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess : false,
            message : "Error in transaction api",
            error
        });
    }
};

const getoneSale = async(req,res) => {
    try {
        const transaction = await salesModel.findOne({transactionID : req.params.tid});

        if(!transaction) {
            return res.status(404).send({
                success : false,
                message : "Transaction Not Found!",
            });
        }

        res.status(200).json({
            status : "success",
            data : {
                transaction
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess : false,
            message : "Error in Fetch API!",
            error
        })
    }
};

const deleteSale = async (req, res) => {
    try {
        await salesModel.findByIdAndDelete(req.params.objid);
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
        const filter = { name: 'Jean-Luc Picard' };
        const update = { age: 59 };

        await salesModel.findOneAndUpdate(filter, update);
        res.status(200).send({
            success: true,
            message: "Transaction updated successfully"
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

module.exports = { newsalesController, getoneSale, deleteSale, updateSale };