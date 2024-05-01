const verifyToken = require("../middlewares/verifyToken");
const Employee = require("../models/Employee"); // Corrected here
const employeeController = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

employeeController.get("/getAll", verifyToken, async (req, res) => {
  try {
    const employees = await Employee.find({}); // Corrected here
    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
  }
});

employeeController.post("/create", verifyToken, async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
  }
});

employeeController.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
  }
});

employeeController.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    return res.status(200).json("Employee has been deleted");
  } catch (error) {
    console.error(error);
  }
});

employeeController.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
  }
});

module.exports = employeeController;
