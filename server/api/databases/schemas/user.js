import mongoose from 'mongoose';
import { genSalt, hash as _hash, compare } from 'bcrypt-nodejs';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;


const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = '/img/user.jpg';
const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, default: null },
    role: { type: String, default: ROLES.USER },
    displayName: { type: String, default: null },
    picture: { type: String, default: DEFAULT_USER_PICTURE },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

/**
 * Before save a user document, Make sure:
 * 1. User's picture is assigned, if not, assign it to default one.
 * 2. Hash user's password
 *
 */
// eslint-disable-next-line func-names
userSchema.pre('save', (next) => {
  const user = this;

  // ensure user picture is set
  if (!user.picture) {
    user.picture = DEFAULT_USER_PICTURE;
  }

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  return genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    _hash(user.password, salt, null, (errHash, hash) => {
      if (errHash) return next(errHash);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
    return true;
  });
});

/**
 * Create an Instance method to validate user's password
 * This method will be used to compare the given password with the passwoed stored in the database
 *
 */
userSchema.methods.validatePassword = (password, callback) => {
  compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};
const userModel = mongoose.model('User', userSchema);
export default userModel;
