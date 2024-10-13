import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass {
  name: string;
}
export const classSchema = new Schema<IClass>({
    name:{
      type:String,
      required :[true,"class is required"],
    },
})

export default mongoose.model<IClass>("Class", classSchema);