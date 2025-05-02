import express, { Request, Response } from "express";
import employee from "../models/empTable";
import User from "../models/usertable";

//create employee ..
export const CreateEmp = async (req: Request, res: Response) => {
  //get employee details by request.
  const { basic_salary, HRA, allowances, role, workingHours, deductions, attendance, email, month } = req.body

  //checking for required fields.
  if (!basic_salary || !HRA || !allowances || !workingHours || !deductions || !attendance || !email || !month) {
    res.status(400).json("please fill all require fields. ")
  }

  //search user(Employee) data ..
  const userRecord: any = await User.findOne({ where: { email: email } });
  if (!userRecord) {
    res.status(400).json("Employee not found. Please ensure the email is registered before adding salary details to the database.");
  }

//create employee ..
  const employeeTable = employee.create({
    "basic_salary": basic_salary,
    "HRA": HRA,
    "allowances": allowances,
    "role": userRecord.type,
    "workingHours": workingHours,
    "deductions": deductions,
    "attendance": attendance,
    "tax": 0,
    "PF": 0,
    "month": month,
    "userId": userRecord.id
  })

  res
    .status(200)
    .json({ "message": "employee details added successfully." })
}

//get single employee salary by id ..
export const getSingleEmpsalary = async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleEmployee = await employee.findOne({ where: { "id": id } })

  res
    .status(200)
    .json({ "employee": singleEmployee })
}



