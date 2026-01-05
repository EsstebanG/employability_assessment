import { DataSource } from 'typeorm';

// Cargar variables de entorno. / Load environment variables.
import * as dotenv from 'dotenv';
dotenv.config();

import { User } from './users/entities/user.entity';
import { Vacancy } from './vacancies/entities/vacancy.entity';
import { Application } from './applications/entities/application.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'employability_db',

    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
    
    entities: [User, Vacancy, Application],
    migrations: [__dirname + '/database/migrations/*.{ts,js}'],
});
