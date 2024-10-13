import { promises } from 'dns';
import Student ,{IStudent}from '../models/studentModel'
import ClassModel,{IClass} from '../models/classModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import {loginDTO} from '../DTO/loginDTO'


dotenv.config();

// יצירת סטודנט
export const createStudent = async (user:IStudent):Promise<string> => {
    try {
        const {username,email,password,myclass,tests} = user
        if(!username || !email || !password){
            throw new Error ( "Email and name required");
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const dbTeacher = new Student({  
            username,
            email,
            password : hashedPassword,
            myclass,
            tests
        })
        const classes:IClass[]  = await ClassModel.find({name:myclass}) 
        if(classes.length ===0 ){
            throw  new Error("There is no such class 🫢");
        }
        const saving =  await dbTeacher.save()
        return saving.id
    } catch (err) {
        throw err      
    }
}


// כניסת סטודנט
export const login = async (req:loginDTO) => {
  const { username, password } = req
  try {
    const user = await Student.findOne({ username });
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










