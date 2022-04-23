const Employee = require("../models/employeeModel");
const factory = require("./handlerFunctionsFactory");

exports.getAllEmployees = factory.getAll(Employee);
exports.getEmployee = factory.getOne(Employee);
exports.createEmployee = factory.createOne(Employee);
exports.updateEmployee = factory.updateOne(Employee);
exports.deleteEmployee = factory.deleteOne(Employee);
