import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/College')
    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};   


export default connectDB;       