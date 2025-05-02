import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usertable";

export const login = async (req: Request, res: Response, next: NextFunction) => {
   const { email, password } = req.body;
   //checking for required fields.
   if (!email || !password) {
      res.status(400).json("Please fill email and password.");
   }
   
   try {
      //search user recored by email.
      const userRecord: any = await User.findOne({ where: { email: email } });
      if (!userRecord) {
         res.status(400).json("Email not found.");
      }

      //check password corect or not.
      const passwordCheck = await bcrypt.compare(password, userRecord.password);
      if (!passwordCheck) {
         res.status(400).json("Password does not match.");
      }

      //generate token..
      const token = jwt.sign(
         { id: userRecord.id.length, email: userRecord.email, type: userRecord.type },
         process.env.JWT_SECRET_KEY as string,
         { expiresIn: '1h' }
      );

      //update token in db..
      const tokenUpdate = await User.update({ token: String(token) }, { where: { email: email } });
      if (tokenUpdate) {
         //add toekn in cookies..
         res
            .cookie("authUserToken", token, { httpOnly: true })
            .status(200)
            .json({ Message: "Login successfully." });
      } else {
         res.status(500).json({ error: "Token not update .." });
      }

   } catch (error) {
      res.status(500).json({ error: "Login failed", details: error });
   }
};
