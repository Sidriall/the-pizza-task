import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import User from 'models/User';
import dbConnect from 'lib/dbConnect';

// TODO any
passport.serializeUser((user: any, done) => {
  // eslint-disable-next-line no-underscore-dangle
  done(null, user._id);
});

// @ts-ignore
passport.deserializeUser(async (_req, id: string, done) => {
  await dbConnect();
  User.findOne({ _id: id }).then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passReqToCallback: true },
    async (_req, username, password, done) => {
      await dbConnect();

      const user = await User.findOne({ username });

      if (user && (await bcrypt.compare(password, user.password)))
        done(null, user);
      else done(null, false, { message: 'Email or password is incorrect' });
    }
  )
);

export default passport;
