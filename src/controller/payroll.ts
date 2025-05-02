import express, { Request, Response } from 'express';

import employeeTable from "../models/empTable";

//employee distribution based on months..
export const distributed = async (req: Request, res: Response) => {

    const { month } = req.body;
    //checking for required fields.
    if (!month) {
        res.status(400).json({ error: "please enter months details." });
    }

    const monthformate = `${month}`
    //search data ..
    const PayrollDistribute = await employeeTable.findOne({
        where: {
            month: monthformate
        }
    });

    res
        .status(200)
        .json({ "Payroll distributed": PayrollDistribute })
}



//get user salary history by months..
export const history = async (req: Request, res: Response) => {
    const { month } = req.body;
    if (!month) {
        res.status(400).json({ error: "please enter months details." });
    }

    const monthformate = `${month}`
    const payrollHistory = await employeeTable.findOne({
        where: {
            month: monthformate
        }
    });
    res
        .status(200)
        .json({ "Payroll History": payrollHistory })

}

