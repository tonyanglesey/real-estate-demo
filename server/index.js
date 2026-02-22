import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import leadsRouter from './routes/leads.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'leadflow-re-server' });
});

app.use('/api/leads', leadsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
