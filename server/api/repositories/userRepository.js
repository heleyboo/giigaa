const User = require('../databases').models.user;

const createUser = async (data) => {
    let user = new User(data);
    return user.save();
}

const findOneByUsername = async (username) => {
    return User.findOne({username: username});
}

const getAllUsers = async () => User.find({});

module.exports = {
    getAllUsers,
    createUser,
    findOneByUsername
}