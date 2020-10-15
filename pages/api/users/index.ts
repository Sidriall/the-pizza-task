import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from 'lib/dbConnect';
import User from 'models/User';
import { extractUser } from 'lib/api-helpers';
import nextConnect from 'next-connect';
import middleware from 'middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  if (!password || !username) {
    res.status(400).send('Missing field(s)');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await dbConnect();

  try {
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // res.status(201).json({ success: true, data: user });
    // @ts-ignore
    req.logIn(user, (err: Error) => {
      if (err) throw err;
      res.status(201).json({
        user: extractUser(req),
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;
