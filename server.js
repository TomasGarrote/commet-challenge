const express = require('express');
const cors = require('cors');
const prisma = require('@prisma/client').PrismaClient;

const app = express();
const port = 5000;

// Usar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

const prismaClient = new prisma();

// Ruta para crear un nuevo deal
app.post('/deals', async (req, res) => {
  const { salesperson, amount, date } = req.body;

  try {
    const newDeal = await prismaClient.deal.create({
      data: {
        salesperson,
        amount,
        date,
      },
    });
    res.status(201).json(newDeal);
  } catch (error) {
    console.error('Error creando el deal:', error);
    res.status(500).json({ error: 'Error creando el deal' });
  }
});

// Ruta para obtener todos los deals
app.get('/deals', async (req, res) => {
  try {
    const deals = await prismaClient.deal.findMany();
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error obteniendo los deals:', error);
    res.status(500).json({ error: 'Error obteniendo los deals' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
