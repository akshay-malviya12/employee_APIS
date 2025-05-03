

import { Sequelize, DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/db";
import User from "./usertable";

//create table structure for employees..
const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  basic_salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  HRA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  allowances: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deductions: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PF: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  attendance: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Employee', 'HR', 'Admin'),
    allowNull: false
  },
  workingHours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User", // table name
      key: "id"
    }
  },
});

// Set up the One-to-Many relationship
User.hasMany(Employee, { foreignKey: 'userId' }); 

sequelize.sync().then(() => {
  console.log('employee table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

export default Employee;







