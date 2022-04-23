const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide employee name !"],
    },
    attended: {
      type: Boolean,
      required: [true, "Please employee attendance status !"],
      default: false,
    },
    attendDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
