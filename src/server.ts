import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
import { Server } from 'http';
dotenv.config();


const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library-Management';

let server: Server;
async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    server = app.listen(PORT, () => {
    console.log("hei mongoose", PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

