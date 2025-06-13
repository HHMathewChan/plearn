const studentRepository = require('../repositories/studentRepository');
const platformUserRepository = require('../repositories/platformUserRepository');
const hasStudentProfileInRepository = require('../repositories/hasStudentProfileInRepository');
const {generateToken} = require('./jwtService');

/**
 * verfify a platform user login by comparing the email and password
 * and return the platform_user_id, the code that corresponds to the user role and JWT token if the login is successful
 */

async function verifyPlatformUserLogin(email, password) {
  // for debugging purpose
  console.log("in file:platformUserService.js, verifyPlatformUserLogin called");
  const platform_user = await platformUserRepository.getUserByEmail(email);
  if (!platform_user) {
    throw new Error('User not found');
  }

  // assuming password will be hashed in the future
  const password_hash = platform_user.password_hash;
    if (password_hash !== password) {
        throw new Error('Invalid email or password');
    }
  // Find the user code corresponding to their role
  // first we need to get the role from the platform_user object
  const role = platform_user.role;
  // if the role is a student, we need to get the student_code
  const role_code = await hasStudentProfileInRepository.getStudentCodeByPlatformUserId(platform_user.platform_user_id);
  // if the role is not a student, we just return an empty string, but at the moment we only have student role
  const token = generateToken({ id: platform_user.platform_user_id, role: platform_user.role });
  return {
    platform_user_id: platform_user.platform_user_id,
    role_code: role_code,
    role: role,
    token,
  };
}

module.exports = {
  verifyPlatformUserLogin,
};
