/* This is a database connection function */
import mongoose from 'mongoose';

export async function dbConnection() {
  // @ts-ignore
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

const connection: any = {}; /* creating connection object */

async function dbConnect() {
  /* check if we have connection to our database */
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  // @ts-ignore
  const db = await dbConnection();

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
