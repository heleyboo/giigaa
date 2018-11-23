import models from '../databases';

const User = models.userModel;

const createUser = async (data) => {
  const user = new User(data);
  return user.save();
};

const findOneByUsername = async username => User.findOne({ username });

const getAllUsers = async () => User.find({});

const userRepository = {
  getAllUsers,
  createUser,
  findOneByUsername,
};

export default userRepository;
