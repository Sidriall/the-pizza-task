import nextConnect from 'next-connect';
import passport from 'lib/passport';
import session from './session';

const middleware = nextConnect();

middleware.use(session).use(passport.initialize()).use(passport.session());

export default middleware;
