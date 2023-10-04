import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (!process.env.MONGODB_URL) {
    return console.log('MONGODB_URL not founded');
  }

  if (isConnected) {
    return console.log('Already Connected MongoDB');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnect(true);
    console.log('Connected!')
  } catch (err) {
    console.log(err); 
  }

}