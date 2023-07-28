export default () => ({
  appEnv: process.env.APP_ENV || 'development',
  port: parseInt(process.env.PORT || '3000'),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
