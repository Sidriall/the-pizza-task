import nextConnect from 'next-connect';
import middleware from 'middlewares/middleware';
import passport from 'lib/passport';
import { extractUser } from 'lib/api-helpers';
import { NextApiResponse } from 'next';

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res: NextApiResponse) => {
  res.json({ user: extractUser(req) });
});

// TODO any
handler.delete((req: any, res: NextApiResponse) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
