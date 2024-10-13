import { Request, Response } from "express";
import User, { ITeacher } from "../models/teacherModel";
import {createTeacher, login,getStudents, addTheScore,udateTheScore} from '../services/teacherService'

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


export const signin = async (req: Request, res: Response):Promise<void> => {
    try {
        const teacher = await login(req.body)
        res.status(201).json({
              msg:`teacher ${req.body.username} created `,
              id:teacher
        })
    } catch (err) {
        res.status(401).json((err as Error).message)     
    }
};


export const getMyStudents = async (req: Request, res: Response):Promise<void> => {
    try {
        const teacher = await getStudents()
        res.status(201).json({
              msg:`teacher ${req.body.username} created `,
              id:teacher
        })
    } catch (err) {
        res.status(401).json((err as Error).message)     
    }
};



export const addScore = async (req: Request,res: Response,): Promise<void> => {
  try {
    const studentUpdated = await addTheScore(req.params.id,req.body)
  res.status(201).json({
      msg:`The score added successfully 👌`,
      post:studentUpdated         
    })
} catch (err) {
    res.status(401).json((err as Error).message)     
    }

};



export const updateTest = async (req: Request,res: Response,): Promise<void> => {
    try {
      const testUpdate = await udateTheScore(req.params.id,req.body)
    res.status(201).json({
        msg:`Test successfully updated `,
        testUpdate:testUpdate
  })
  } catch (err) {
  res.status(401).json((err as Error).message)     
  }
  
  };

