import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const webhook = await prisma.webhook.create({
        data: {
          data: JSON.stringify(req.body), // Convertimos el objeto a string
        },
      });
      res.status(200).json({ message: 'Webhook received and saved', id: webhook.id });
    } catch (error) {
      console.error('Error saving webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const webhooks = await prisma.webhook.findMany();
      const parsedWebhooks = webhooks.map(webhook => ({
        ...webhook,
        data: JSON.parse(webhook.data), // Convertimos el string de vuelta a objeto
      }));
      res.status(200).json(parsedWebhooks);
    } catch (error) {
      console.error('Error retrieving webhooks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}