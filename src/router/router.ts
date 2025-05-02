import express from "express";
import { login } from '../controller/Authlogin';
import { logout } from "../controller/AuthLogout";
import { calculate, employeeId } from "../controller/SalaryCalculation";
import { CreateEmp, getSingleEmpsalary } from "../controller/EmployeeControllers";
import { distributed, history } from "../controller/payroll";
import { attendance } from "../controller/attendance";
import { authentication, authRoleBased } from "../middleware/authentication";
import { signUp } from "../controller/signup";


const router = express.Router();
//For SignUP ..
router.post("/signup", signUp);

//Authentication APIs ..
router.post("/auth/login", login);
router.post("/auth/logout", authentication, logout);

//Employee Management APIs ..
router.post('/employees', authentication, authRoleBased, CreateEmp);
router.get('/employees/:id', authentication, getSingleEmpsalary)

//Attendance Api ..
router.post('/attendance/mark', authentication, attendance);

//Salary Calculation APIs ..
router.post('/salary/calculate', authentication, authRoleBased, calculate)
router.get('/salary/:employeeId', authentication, employeeId)

//payroll
router.post('/payroll/distribute', authentication, authRoleBased, distributed);
router.get('/payroll/history', authentication, authRoleBased, history);


export default router;


