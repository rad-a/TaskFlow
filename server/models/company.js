const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    type: String,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  url: {
    type: String
  },
  dateCreated: { 
    type: Date,
    default: Date.now
  },
});

//Model
const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
