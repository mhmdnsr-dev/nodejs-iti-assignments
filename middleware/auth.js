import jwt from 'jsonwebtoken';

const auth = () => {
  return (req, res, next) => {
    try {
      const { token } = req.headers;
      jwt.verify(token, 'mykey');
      next();
    } catch (error) {
      res.status(401).json(error);
    }
  };
};

export default auth;
