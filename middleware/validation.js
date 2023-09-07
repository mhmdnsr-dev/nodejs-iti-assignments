const reqBodyVali = schema => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const details = error.details.map(d => d.message);
        res.status(400).json(details);
      } else next();
    } catch (error) {
      res.status(500).json(error);
    }
  };
};
const reqQueryVali = schema => {
  return (req, res, next) => {
    try {
      const query = {};
      query.name = req.query.name;
      if (!Number.isNaN(+req.query.age)) query.age = +req.query.age;
      else query.age = req.query.age;

      const { error } = schema.validate(query, { abortEarly: false });
      if (error) {
        const details = error.details.map(d => d.message);
        res.status(400).json(details);
      } else next();
    } catch (error) {
      res.status(500).json(error);
    }
  };
};
export default { reqBodyVali, reqQueryVali };
