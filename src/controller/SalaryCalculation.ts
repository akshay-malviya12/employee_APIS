import express, { Request, Response } from "express";
import employeeTable from "../models/empTable";
import User from "../models/usertable";
import EmpSalaryMonths from "../models/empSalaryMoths";

const router = express.Router();

//salary Structure ..
type SalaryDetails = {
    employeeId: number;
    month: string; // Format 'YYYY-MM'
    salary: number;
};

//salary input & tax calculation..
const taxCalculation = (salary: number): number => {
    if (salary <= 250000) return 0;
    else if (salary <= 500000) return (salary - 250000) * 0.05;
    else if (salary <= 1000000) return (salary - 500000) * 0.02 + 12500;
    else return (salary - 1000000) * 0.3 + 22500; // extra bracket for > 10L
};

//add emloyee salary by months.
const AddEmpSalaryBYMonths = async (id: number, salary: number, month: string) => {
    const result = await EmpSalaryMonths.create({ salary: salary, Months: month, emp_id: id });
    return result;
}

//complete calculation..
export const calculate = async (req: Request, res: Response) => {
    try {
        const { id, Full_Days, Half_Days, month } = req.body;
        //add validation ..
        if (!id || Full_Days === undefined || Half_Days === undefined) {
            res.status(400).json({ error: "Missing required fields." });
        }
//search employee data by id ..
        const employee: any = await employeeTable.findOne({ where: { id } });
        console.log("employee", employee)
        if (!employee) {
            res.status(404).json({ error: "Employee not found." });
        }
  
//calculation salary ..
        const totalWorkingDays = 30;
        const Gross_Salary = employee.basic_salary + employee.HRA + employee.allowances;
        const tax = taxCalculation(Gross_Salary);
        const PF_Deduction = (employee.basic_salary * 12) / 100;
        const Daily_Wage = Gross_Salary / totalWorkingDays;
        const Full_Day_Salary = Daily_Wage;
        const Half_Day_Salary = employee.dailyWorkingHours > 8 ? Daily_Wage / 2 : 1;

        const Total_Salary = (Full_Days * Full_Day_Salary) + (Half_Days * Half_Day_Salary);
        const Net_Salary = Total_Salary - tax - PF_Deduction;

        //update tax details after calculation ..
        await employeeTable.update(
            { tax },
            { where: { id } }
        );

   //validate require fields ..
        if (!id || !Net_Salary || !month || typeof month !== "string") {
            res.status(400).json({ error: "Missing required fields (id, salary, month)" });
        }
//add employee salary in tables.
        const result = await AddEmpSalaryBYMonths(id, Number(Net_Salary.toFixed(2)), month);
        if (!result) {
            res.status(500).json({ message: "Salary month not entered " });
        }

        res.status(200).json({
            message: "Total salary after deductions:",
            netSalary: Net_Salary.toFixed(2)
        });

    } catch (error) {
        console.error("Error in salary calculation:", error);
        res.status(500).json({ error_message:error});
    }
};

//get data by empid..
export const employeeId = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;
        const { month } = req.body;
//check required fields..
        if (!employeeId || typeof employeeId !== "string") {
            res.status(400).json({ error: "Invalid or missing employee ID." });
        }
       //months not empty fields..
        if (!month || typeof month !== "string") {
            res.status(400).json({ error: "Please enter month details." });
        }
       //get salary by id and months.
        const salaryEmpMonths = await EmpSalaryMonths.findOne({
            where: {
                emp_id: employeeId,
                months: month
            }
        });

        res.status(200).json({
            message: "Self employee salary by month",
            data: salaryEmpMonths
        });

    } catch (error) {
        console.error("Error in fetching salary:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};








