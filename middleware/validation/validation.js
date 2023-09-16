const validation = schema => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(d => d.message);
      return res.status(406).json(errors);
    }

    next();
  } catch (err) {
    console.error('validation error:', err);
    res.status(500).json(err);
  }
};
export default validation;
