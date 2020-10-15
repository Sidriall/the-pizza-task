import nextConnect from 'next-connect';
import middleware from 'middlewares/middleware';
import { extractUser } from 'lib/api-helpers';
import { NextApiResponse } from 'next';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res: NextApiResponse) =>
  res.json({ user: extractUser(req) })
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
