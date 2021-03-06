const express = require("express");
const employeeController = require("../controllers/employeeController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.use(authController.restricTo("hr"));
router.use(authController.isLoggedIn);

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee);
router
  .route("/:id")
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
