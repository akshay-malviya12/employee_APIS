import express, { Request, Response } from "express";
import db from "../config/db";
import bcrypt from 'bcryptjs';
import User from "../models/usertable";
import jwt from "jsonwebtoken";

const router = express.Router();

//EndPoint for creating a new user
export const signUp = async (req: Request, res: Response) => {
  const { name, email, password, type } = req.body;
//validation for required fields..
  if (!name || !email || !password || !type) {
    res.status(400).json({ error: "All fields are required" });
  }
  try {
    //search user exist or not ..
    const existingEmp = await User.findOne({ where: { email } });
    if (existingEmp) {
      res.status(409).json({ error: "Emp already exists .." });
    }
    //create password hash ..
    const hashPassword = bcrypt.hashSync(password, 10);

    //Generate token ..
    const token = jwt.sign(
      { id: password.length, email: email, type: type },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' }
    );

    //create new user with details ..
    const newUser = await User.create({
      email,
      password: hashPassword,
      type,
      token,
      name
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
}

