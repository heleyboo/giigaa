const userRepo = require('../../repositories/userRepository');
const auth = require('../helpers/auth');
const validator = require('validator');

exports.login = (req, res, next) => {
    let role = req.swagger.params.role.value;
    let username = req.body.username;
    let password = req.body.password;

    if (role != "user" && role != "admin") {
        let response = { message: 'Error: Role must be either "admin" or "user"' };
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
    }

    if (username == "username" && password == "password" && role) {
        let tokenString = auth.issueToken(username, role);
        let response = { token: tokenString };
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
    } else {
        let response = { message: "Error: Credentials incorrect" };
        res.writeHead(403, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
    }
}

exports.register = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (validator.isEmpty(username) || validator.isEmpty(password)) {
        let response = { message: 'Error: Username or pasword must not empty' };
        res.json(response);
    }
    let user = userRepo.findOneByUsername(username)
    .then(user => {
        console.log(user);
    })
    .catch(err => {

    });
}

exports.getListUsers = (req, res) => {
    var name = req.swagger.params.name.value || 'stranger';
    console.log(name);

    userRepo.getAllUsers()
    .then(users => {
        res.json("Success OK");
    }).catch(err => {
        res.json("error");
    });
}