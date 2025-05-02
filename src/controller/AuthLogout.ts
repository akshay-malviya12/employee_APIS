import express, { Request, Response } from "express";

//for logout..
export const logout = (req: Request, res: Response) => {
    //clear cookies..
    res.clearCookie("authUserToken");
    res.json({ Message: "Logout success" });
};


