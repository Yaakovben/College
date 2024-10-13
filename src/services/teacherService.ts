import { promises } from 'dns';
import Teacher ,{ITeacher}from '../models/teacherModel'
import ClassModel,{IClass} from '../models/classModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import {loginDTO} from '../DTO/loginDTO'


import { log } from 'console'; 

dotenv.config();
export const createTeacher = async (user:ITeacher):Promise<string> => {
    try {
        const {username,email,password,myclass,scores,students} = user
        if(!username || !email || !password){
            throw Error ( "Email and name required");
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const dbTeacher = new Teacher({  
            username,
            email,
            password : hashedPassword,
            myclass,
            scores,
            students
        })
        const classes:IClass[]  = await ClassModel.find({name:myclass}) 
        if(classes.length > 1){
            throw  new Error("Class is fully occupied 🫢");
        }
        const dbClass = new ClassModel({
            name:myclass
        })
        dbClass.save()
        const saving =  await dbTeacher.save()
        return saving.id
    } catch (err) {
        throw err
        
    }
}




export const login = async (req:loginDTO) => {
  const { username, password } = req

  try {
    const user = await Teacher.findOne({ username });
    if (!user) {
      throw new Error ("'user undfind 🫢 ")
    }
    const PasswordIsCorrect = await bcrypt.compare(password, user.password);
    if (!PasswordIsCorrect) {
     throw new Error ("Worng password 🫢")
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );
    return  token ;
  } catch (err) {
    console.log(err);
    throw err
  }
};










