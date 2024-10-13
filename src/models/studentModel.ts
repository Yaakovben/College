import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITests {
  subject: string;
  score: Number;
  createdAt: Date;
}

export interface IStudent extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password:string,
  class:string,
  tests: ITests[];
}

export const TestsSchema = new Schema<ITests>({
  subject:{
    type:String,
    required :[true,"subject is required"],
    minlength: [5, "way too short subject, please enter at least 5 chars"]
  },
  score:{
    type:Number,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }

});
const StudentSchema = new Schema<IStudent>({
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
  class:{
    type:String,
    required :[true,"user class is required"],

  },
  tests:{
    type:[TestsSchema]
  }
});


export default mongoose.model<IStudent>("Student", StudentSchema);
