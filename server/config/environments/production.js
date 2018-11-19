module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    secret: process.env.SECRET,
    env: process.env.NODE_ENV,
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
    }
};
