import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL || 'postgresql://localhost:5432/leadflow_re';

export const pool = new Pool({
  connectionString,
});

pool.on('error', (error) => {
  console.error('Unexpected PG pool error', error);
});

export const query = (text, params = []) => pool.query(text, params);
