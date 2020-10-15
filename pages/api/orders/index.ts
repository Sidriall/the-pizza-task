import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import Order from 'models/Order';
import nextConnect from 'next-connect';
import middleware from 'middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, name, surname, address, details } = req.body;
  if (!name || !surname || !address) {
    res.status(400).send('Missing field(s)');
    return;
  }

  await dbConnect();

  try {
    await Order.create({
      userId,
      name,
      surname,
      address,
      details,
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json(error);
  }
});

// TODO any
handler.get(async (req: any, res: NextApiResponse) => {
  const { _id: userId } = req.user;

  if (!userId) {
    res.status(400).send('Missing user ID');
    return;
  }

  await dbConnect();

  try {
    const orders = await Order.find(
      {
        userId,
      },
      { name: 1, surname: 1, address: 1, details: 1, createdAt: 1 },
      { sort: { createdAt: -1 } }
    ).exec();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default handler;
