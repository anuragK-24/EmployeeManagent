const verifyToken = require("../middlewares/verifyToken");
const Empolyee = require("../models/Employee");
const employeeController = require("express").Router();

employeeController.get("/getAll", verifyToken, async (req, res) => {
  try {
    const employees = await Empolyee.find({});
    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
  }
});

employeeController.post("/create", verifyToken, async (req, res) => {
  try {
    const newEmployee = await Empolyee.create(req.body);
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
  }
});

employeeController.put("/update/:id", verifyToken,  async (req, res) => {
  try {
    const updatedEmployee = await Empolyee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
  }
});

employeeController.delete("/delete/:id",  verifyToken, async (req, res) => {
  try {
    await Empolyee.findByIdAndDelete(req.params.id);
    return res.status(200).json("Employee has been deleted");
  } catch (error) {
    console.error(error);
  }
});

employeeController.get("/find/:id", verifyToken,  async (req, res) => {
  try {
    const employee = await Empolyee.findById(req.params.id);
    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
  }
});

module.exports = employeeController;
