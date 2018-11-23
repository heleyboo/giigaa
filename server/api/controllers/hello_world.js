function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.
  // swagger.params.{parameter_name}
  const name = req.swagger.params.name.value || 'stranger';

  // this sends back a JSON response which is a single string
  res.json(name);
}

module.exports = {
  hello,
};
