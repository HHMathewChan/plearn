/**
 * This file is to manage platform user operations.
 * It includes functions to verify platform user login.
 */
const platformUserService = require('../services/platformUserService');
const { validateName } = require('../utilities/sanitize');
const { sanitiseText } = require('../validation/textSanitiser');

/**
 * handlers for the verifyPlatformUserLogin function
 * assign the parameter needed from request body to variable
 * @returns {Object}
 * @property {string} platform_user_id - Unique identifier for the platform user.
 * @property {string} role_code - Code corresponding to the user's role.
 * @property {string} role - The role of the platform user (e.g., student).
 * @property {string} token - JWT token for the platform user.
 */
const verifyPlatformUserLogin = async (request, response) => {
  // for debugging purpose
  console.log("verifyPlatformUserLogin called");
  console.log("Raw request body:", request.body);

  try {
    const { email, password } = request.body;
    // Sanitise the input strings
    const sanitisedEmail = sanitiseText(email || '');
    const sanitisedPassword = sanitiseText(password || '');
    const result = await platformUserService.verifyPlatformUserLogin(sanitisedEmail, sanitisedPassword);
    response.status(200).json(result);
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(500).json({ error: error.message });
  }
};

/**
 * handlers for the registerPlatformUser function
 * assign the parameter needed from request body to variable
 */
const registerPlatformUser = async (request, response) => {
  // for debugging purpose
  console.log("registerPlatformUser called");
  console.log("Raw request body:", request.body);

  try {
    const { name, email, password, role } = request.body;

    // Validate and sanitize name
    const cleanName = validateName(name);
    // console.log("Original name:", JSON.stringify(name));
    // console.log("Cleaned name:", JSON.stringify(cleanName));

    const studentCode = await platformUserService.registerPlatformUser({
      name: cleanName,
      email,
      password,
      role
    });
    response.status(201).json({ student_code: studentCode });
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(500).json({ error: error.message });
  }
}

module.exports = {
  verifyPlatformUserLogin,
  registerPlatformUser,
};