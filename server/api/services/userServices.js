import validator from 'validator';
// import userRepo from '../repositories/userRepository';

import { issueToken } from '../helpers/auth';
// const auth = require('../helpers/auth');

const login = (req, res) => {
  const role = req.swagger.params.role.value;
  const {
    username,
    password,
  } = req.body;

  if (role !== 'user' && role !== 'admin') {
    const response = { message: 'Error: Role must be either "admin" or "user"' };
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  }


  if (username === 'username' && password === 'password' && role) {
    const tokenString = issueToken(username, role);
    const response = {
      tokenString,
      username,
      role,
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  }
  const response = { message: 'Error: Credentials incorrect' };
  res.writeHead(403, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(response));
};

const register = (req, res) => {
  const {
    username,
    password,
  } = req.body;
  if (validator.isEmpty(username) || validator.isEmpty(password)) {
    const response = { message: 'Error: Username or pasword must not empty' };
    res.json(response);
  }
};

const userService = {
  login,
  register,
};

export default userService;
