# employee_APIS

Using postman....
after login, add bearer token in Autheratization..... 

SIGNUP
{"name":"name21","email":"admin1@example.com","password":"123","type":"Admin"}

LOGIN
{"email":"admin21@example.com","password":"123"}

GET - EMPLOYEE BY ID
 http://localhost:3000/employees/5

POST - EMPLOYEE 
{"basic_salary":25000, "HRA":5000, "allowances":2000, "workingHours":8, "deductions":2160,
 "attendance":"P" ,"email":"admin@example.com" ,"month":"2025-02","role":"Admins"}

POST - ATTENDANCE/MARK
{"id":1,"attendance":"p"}


GET - SINGLE EMPLOYEE SALARY BY MONTHS
 http://localhost:3000/salary/5
 {"month":"2025-02"}

POST -
{"id":5,"Full_Days":5,"Half_Days":25,"month":"2025-02","role":"Admin"}


POST - PAYROLL/DISTRIBUTION
{"month":"2025-02","role":"Admin"}


POST - PAYROLL/HISTORY
{"month":"2025-02","role":"Admin"}


LOGOUT 
POST -  http://localhost:3000/auth/logout
