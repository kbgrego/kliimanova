import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env['KLIIMANOVA_DATABASE_URL']
});

export default pool;
