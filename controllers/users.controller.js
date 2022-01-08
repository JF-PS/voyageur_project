module.exports = (business) => ({
  async signIn(req, res) {
    business
      .signIn(req.body)
      .then((result) => {
        res.status(result.status).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  async signUp(req, res) {
    business
      .signUp(req.body)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
});
