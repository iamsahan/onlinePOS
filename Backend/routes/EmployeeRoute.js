import express from 'express';
import { Employee } from '../models/Employee.js';

const app = express();
app.use(express.json()); // Add this line to parse JSON bodies

const router = express.Router();

// Route for saving a new Employee
router.post('/', async (request, response) => {
  try {
    const { EmpID, employeeName, phone, role, password, passwordConfirm } = request.body;

    if (!EmpID || !employeeName || !phone || !role || !password || !passwordConfirm) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, phone, role, password, passwordConfirm',
      });
    }
    if (password !== passwordConfirm) {
      return response.status(400).send({ message: 'Passwords do not match' });
    }

    const newEmployee = await Employee.create({
      EmpID,
      employeeName,
      phone,
      role,
      password,
      passwordConfirm,
    });

    return response.status(201).send(newEmployee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for getting all Employees from the database
router.get('/', async (request, response) => {
  try {
    const employees = await Employee.find({});
    return response.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for getting one Employee from the database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const employee = await Employee.findById(id);
    return response.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for updating an Employee
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { EmpID, employeeName, phone, role, password, passwordConfirm } = request.body;

    if (!EmpID || !employeeName || !phone || !role || !password || !passwordConfirm) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, phone, role, password, passwordConfirm',
      });
    }
    if (password !== passwordConfirm) {
      return response.status(400).send({ message: 'Passwords do not match' });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(id, request.body, { new: true });
    if (!updatedEmployee) {
      return response.status(404).json({ message: 'Employee not found' });
    }
    return response.status(200).send({ message: 'Employee updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for deleting an Employee
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return response.status(404).json({ message: 'Employee not found' });
    }
    return response.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for searching employees based on criteria, pagination, and sorting
router.get('/search', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort = 'EmpID' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = {
      $or: [
        { EmpID: { $regex: new RegExp(search, 'i') } },
        { employeeName: { $regex: new RegExp(search, 'i') } },
        { role: { $regex: new RegExp(search, 'i') } },
        { phone: { $regex: new RegExp(search, 'i') } },
      ],
    };
    const employees = await Employee.find(query)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: employees.length, data: employees });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for employee Login
router.post('/login', async (request, response) => {
  try {
    const { phone, password } = request.body;
    if (!phone || !password) {
      return response.status(400).json({ message: 'Phone and password are required' });
    }
    const employee = await Employee.findOne({ phone });
    if (!employee) {
      return response.status(404).json({ message: 'User not found' });
    }
    if (password !== employee.password) {
      return response.status(401).json({ message: 'Incorrect password' });
    }
    response.status(200).json(employee);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
