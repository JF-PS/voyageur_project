module.exports = (express, controller) => {
  const router = express.Router();

  router.post("/signin", controller.signIn);

  router.post("/signup", controller.signUp);

  return router;
};
