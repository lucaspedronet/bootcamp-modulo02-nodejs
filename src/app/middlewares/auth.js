export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not privaider!' });
  }

  const [, token] = authHeader.split(' ');

  console.log(token);

  return next();
};
