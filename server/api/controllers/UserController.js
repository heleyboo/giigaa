'use strict';

const userService = require('../services/userServices');

function getListUser(req, res) {
    userService.getListUsers(req, res);
}

function login(req, res, next) {
    userService.login(req, res, next);
}

function register(req, res, next) {
    userService.register(req, res, next);
}

module.exports = {
    getListUser: getListUser,
    login: login
}