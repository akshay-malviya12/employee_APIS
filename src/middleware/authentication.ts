
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const JWTSecretKey = process.env.JWT_SECRET_KEY as string;

//create authentication ..
export const authentication = (req: Request, res: Response, next: NextFunction) => {
  //check cookies for authentication ..
  if (req.headers.cookie) {
    const token = req.headers.cookie.split('=')[1];
    if (!token) { res.status(401).json("unauthorized user") }

    //verify jwt token ..
    jwt.verify(token, JWTSecretKey, (err, emp) => {
      if (err) {
        res.status(403).json("invalid token")
      }
    })
    next();
  } else {
    res.status(401).json("unauthorized user")
  }
}

//role based authentication for HR && Admin ..
export const authRoleBased = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.body
  if ((role !== "HR") && (role !== "Admin")) {
    res.status(403).json({ message: 'Forbidden: Access denied' });
  }
  next();
};
