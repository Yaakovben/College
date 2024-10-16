import mongoose, { Schema, Document, Types } from "mongoose";
import { types } from "util";
import validator from "validator";

export interface ITeacher extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password:string,
  myclass:string,
  scores:string[]
  students: Types.ObjectId[];
  role:string,
}

export  const teacherScema = new Schema<ITeacher>({
  username:{
    type:String,
    required :[true,"user name is required"],
    minlength: [5, "way too short name, please enter at least 5 chars"]
  },
  email:{
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true,'Email address is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password:{
    type:String,
    required :[true,"user password is required"],
    minlength: [5, "way too short password, please enter at least 5 chars"]

  },
  myclass:{
    type:String,
    required :[true,"user myclass is required"],

  },
  scores:{
    type:[Number]
  },

  students:{
    type:[Types.ObjectId],
    ref:"Student"
  },
  role:{
    type:String,
    default:"Teacher"
  }
});

export default mongoose.model<ITeacher>("Teacher", teacherScema);
