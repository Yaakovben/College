import { Request, Response } from "express";
import User, { ITeacher } from "../models/teacherModel";
import {createTeacher,} from '../services/teacherService'
import { promises } from "dns";



export const addTeacher = async (req: Request, res: Response):Promise<void> => {
    try {
        const teacher = await createTeacher(req.body)
        res.status(201).json({
              msg:`teacher ${req.body.username} created `,
              id:teacher
        })
    } catch (err) {
        res.status(401).json((err as Error).message)     
    }
};

