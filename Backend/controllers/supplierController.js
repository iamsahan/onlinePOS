import supplierModel from '../models/supplierModel';

const newsupplierController = async (req, res) => {
    try {
        const transaction = new supplierModel(req.body);
        await transaction.save();

        return res.status(201).send({
            success: true,
            message: "Transaction Successfully",
            transaction
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in transaction API",
            error
        });
    }
};

const getoneSupplier = async (req, res) => {
    try {
        const supplier = await supplierModel.findOne({ _id: req.params.sid });

        if (!supplier) {
            return res.status(404).send({
                success: false,
                message: "Transaction Not Found!",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                supplier
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Fetch API!",
            error
        })
    }
};

const getSupplierById = async (req, res) => {
    try {
        const supplier = await supplierModel.findById(req.params.sid);
        if (!supplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }
        res.status(200).json({ success: true, data: supplier });
    } catch (error) {
        console.error('Error fetching supplier:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.find();
        res.status(200).json({ data: suppliers });
    } catch (error) {
        console.error('Error getting suppliers:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        await supplierModel.findByIdAndDelete(req.params.sid);
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

const updateSupplier = async (req, res) => {
    try {
        const { name, email, phone, status, product } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !phone || !status || !product) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const updatedSupplier = await supplierModel.findByIdAndUpdate(
            req.params.sid, // Supplier ID
            { name, email, phone, status, product }, // Updated data
            { new: true } // Return updated document
        );

        if (!updatedSupplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }

        res.status(200).json({ success: true, data: updatedSupplier });
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { newsupplierController, getoneSupplier, deleteSupplier, updateSupplier, getAllSuppliers, getSupplierById };
