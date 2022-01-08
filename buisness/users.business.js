const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "test";

module.exports = (repository) => ({
  async signIn(user) {
    const { login, password } = user;

    try {
      const currentUser = await repository.getByLogin(login);
      if (!currentUser)
        return { message: `Login « ${login} » doesn't exist`, status: 404 };

      const isPasswordCorrect = bcrypt.compare(password, currentUser.password);

      if (!isPasswordCorrect)
        return { message: "Invalid credentials", status: 401 };

      const token = jwt.sign(
        { email: currentUser.email, id: currentUser.id },
        secret,
        {
          expiresIn: "1h",
        }
      );

      return { result: currentUser, token, status: 201 };
    } catch (err) {
      return { message: "Something went wrong", status: 500 };
    }
  },

  async signUp(user) {
    const { login, password, role } = user;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await repository.createUser({
        login,
        password: hashedPassword,
        role,
      });

      const token = jwt.sign({ email: result.email, id: result.id }, secret, {
        expiresIn: "1h",
      });

      return { result, token, status: 201 };
    } catch (err) {
      return { message: "Something went wrong", status: 500 };
    }
  },
});
