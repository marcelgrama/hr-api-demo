import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Check for the presence of a token in the request header
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // Verify the token's validity
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
