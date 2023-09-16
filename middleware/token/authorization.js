import jwt from 'jsonwebtoken';
import fs from 'fs';

const authToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) res.status(401).json('token authorization is require');

    const tokens = JSON.parse(
      fs.readFileSync(
        `${process.env.PWD}/middleware/token/blacklist-tokens.json`,
        {
          encoding: 'utf-8',
        }
      )
    );

    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);

    if (tokens.includes(authorization))
      return res
        .status(403)
        .json('You do not have permission to execute the request');

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError')
      return res.status(401).json(err.message);

    return res.status(500).json(err.message);
  }
};
export default authToken;
