export default () => ({
  appSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
});
