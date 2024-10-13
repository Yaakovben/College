import { promises } from 'dns';
import User ,{ITeacher}from '../models/teacherModel'
import { log } from 'console'; 


export const createTeacher = async (user:ITeacher):Promise<string> => {
    try {
        const {username,email,password,myclass,scores,students} = user
        if(!username || !email || !password){
            throw Error ( "Email and name required");
        }
        const dbTeacher = new User({  
            username,
            email,
            password,
            myclass,
            scores,
            students
        })
        const saving =  await dbTeacher.save()
        return saving.id
    } catch (err) {
        throw err
        
    }
}



