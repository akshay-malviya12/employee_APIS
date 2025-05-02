
import express, { Request, Response } from "express";
import Employee from "../models/empTable";

const router = express.Router();

//employee attendance
export const attendance = async (req: Request, res: Response) => {
    const { id, attendance } = req.body
    if (!id) {
        res.status(400).json({ "error": "employee id not found." })
    }

    try {
        const attendanceEmp = await Employee.update(
            { attendance: String(attendance) },
            { where: { id } }
        );
        
        res
            .status(200)
            .json({ message: "Employee attendance added" });
    } catch (error) {
        res.status(500).json({ "message": error })
    }

}

