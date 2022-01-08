const jwt = require("jsonwebtoken");
const User = require("../models").User;

module.exports = class UsersRepository {
  async getById(id) {
    return await new Promise((resolve, reject) => {
      User.findOne({ where: { id: id } })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getByLogin(login) {
    return await new Promise((resolve, reject) => {
      User.findOne({
        where: { login: login },
      })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async deleteToken(user) {
    return jwt.destroy(user.token);
  }

  async createUser(object) {
    console.log(object);
    return await new Promise((resolve, reject) => {
      User.create(object)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};
