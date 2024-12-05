const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/data', (req, res) => {
  console.log('Datos recibidos del Arduino:', req.body);
  res.status(200).send('Datos recibidos');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
