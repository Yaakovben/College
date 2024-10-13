import { promises } from 'dns';
import Teacher ,{ITeacher}from '../models/teacherModel'
import Student ,{ ITests }from '../models/studentModel'
import ClassModel,{IClass} from '../models/classModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import {loginDTO} from '../DTO/loginDTO'
import cookies from 'cookie-parser'
import { log } from 'console'; 
import studentModel, { IStudent } from '../models/studentModel';

dotenv.config();

// יצירת מורה
export const createTeacher = async (user:ITeacher):Promise<string> => {
    try {
        const {username,email,password,myclass,scores,students} = user
        if(!username || !email || !password){
            throw new Error ( "Email and name required");
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
        if(classes.length === 1){
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

// כניסת מורה
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
      { expiresIn: '1h'}
    );
    return  token ;
  } catch (err) {
    console.log(err);
    throw err
  }
};

// קבלת כל הסטודנטים של המורה
export const  getStudents = async ():Promise<Array<IStudent>> => {
    try {
        const students:IStudent[] = await Student.find({})
        if(students.length ===0){
            throw  new Error("There are no students in the system 🫢");
        }
        return students
    } catch (err) {
        console.log(err);
        throw err      
    }
}

// הוספת ציון לתלמיד
export const addTheScore = async (studentId:string,test: ITests) => {
    try {
        const {subject, score} = test
        const student = await Student.findById(studentId)
        if(!student){
            throw new Error("The student Undfind 😔")
        }
        const newTest:ITests = {
            subject,
            score,
            createdAt:new Date(),
        }
        student.tests.push(newTest)
        const studentUpdated = await student.save()
        return studentUpdated
    } catch (err) {
        console.log(err);
        throw Error
    }  
}

//  עדכון ציון לתלמיד
export const udateTheScore = async (testId:string, postUpdated:ITests)=>{
    try {
        const updatedPost = await Student.findByIdAndUpdate(
            testId,            
            postUpdated,    
            { new: true, runValidators: true }  
        )
        if(!updatedPost){
            throw new Error("The Test Undfind 😔")
        }
        return updatedPost
    } catch (err) {
        console.log(err);
        throw err     
    }
}

// קבלת ציון של מבחן 
export const getTheTest = async (postId:string) =>{
    try {
        const test = await Student.findById(postId) 
        if(!test){
            throw Error("Test undfind 😔")
        }
        return test
    } catch (err) {
        console.log(err);
        throw err        
    }
}











