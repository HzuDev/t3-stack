import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { ci, password } = req.body;

    console.log('Datos recibidos:', { ci, password });

    if (!ci || !password) {
      console.log('Faltan datos');
      return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { ci },
      });

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }

      console.log('Usuario encontrado:', user);

      // Comparar la contraseña en texto plano
      const passwordMatch = password === user.password;

      console.log('Comparación de contraseñas:', { password, storedPassword: user.password, passwordMatch });

      if (!passwordMatch) {
        console.log('Contraseña incorrecta');
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      return res.status(200).json({ message: 'Login exitoso', user });
    } catch (error) {
      console.error('Error en el login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}