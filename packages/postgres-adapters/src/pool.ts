import { Pool } from 'pg';
 
export const pool = new Pool({
  host: 'localhost',
  user: 'db_user',
  password: '12345',
  database: 'service_logger',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});