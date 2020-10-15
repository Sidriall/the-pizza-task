import session from 'express-session';
import connectMongo from 'connect-mongo';
import { dbConnection } from 'lib/dbConnect';
import mongoose from 'mongoose';

const MongoStore = connectMongo(session);

// TODO any
// @ts-ignore
export default async function sessionMiddleware(req, res, next) {
  await dbConnection();

  const mongoStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    stringify: false,
  });

  return session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })(req, res, next);
}
