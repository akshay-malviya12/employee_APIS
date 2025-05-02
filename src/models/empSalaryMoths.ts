import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../config/db";
import Employee from "./empTable";

//create table structure..
const EmpSalaryMonths = sequelize.define("EmpSalaryMonths", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  salary: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Months: {
    type: DataTypes.STRING, // e.g., '2025-05'
    allowNull: false,
  },
  emp_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employees", // table name
      key: "id"
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'emp_salary_months',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}
)

// Set up the One-to-Many relationship
Employee.hasMany(EmpSalaryMonths, { foreignKey: 'emp_id' });

sequelize.sync().then(() => {
  console.log("emp_salary_months table created successfully")
})
  .catch((error) => {
    console.log("error table create:- ", error.message)
  })
export default EmpSalaryMonths;



