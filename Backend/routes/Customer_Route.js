import express from 'express';
import { Customer } from '../models/Customer.js';

//new route

const router = express.Router();

// Route for saving a new customer
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.cusID ||
      !request.body.date ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.NIC ||
      !request.body.phone
    ) {
      return response.status(400).send({
        message: 'Send all required fields: cusID, date, firstName, lastName, NIC, phone',
      });
    }
    const newCustomer = {
      cusID: request.body.cusID,
      date: request.body.date,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      NIC: request.body.NIC,
      phone: request.body.phone,
      email: request.body.email,
    };

    const createdCustomer = await Customer.create(newCustomer);

    return response.status(201).send(createdCustomer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all customers from the database
router.get('/', async (request, response) => {
  try {
    const customers = await Customer.find({});

    return response.status(200).json({
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one customer by ID from the database
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const customer = await Customer.findById(id);

    return response.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a customer
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.cusID ||
      !request.body.date ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.NIC ||
      !request.body.phone
    ) {
      return response.status(400).send({
        message: 'Send all required fields: cusID, date, firstName, lastName, NIC, phone',
      });
    }

    const { id } = request.params;

    const updatedCustomer = await Customer.findByIdAndUpdate(id, request.body, { new: true });

    return response.status(200).json(updatedCustomer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a customer
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    await Customer.findByIdAndDelete(id);

    return response.status(200).send({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
