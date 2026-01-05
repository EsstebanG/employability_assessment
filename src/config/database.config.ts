export default () => ({
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5433),
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_NAME ?? 'employability_db',
    },
});
