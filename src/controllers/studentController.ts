import { Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import {createStudent, login,} from '../services/studentService'
import { promises } from "dns";


export const addStudent = async (req: Request, res: Response):Promise<void> => {
    try {
        const teacher = await createStudent(req.body)
        res.status(201).json({
              msg:`Student ${req.body.username} created `,
              id:teacher
        })
    } catch (err) {
        res.status(401).json((err as Error).message)     
    }
};


export const signin = async (req: Request, res: Response):Promise<void> => {
    try {
        const student = await login(req.body)
        res.status(201).json({
              msg:`Student ${req.body.username} created `,
              id:student
        })
    } catch (err) {
        res.status(401).json((err as Error).message)     
    }
};

