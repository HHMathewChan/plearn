/**
 * This file is to manage platform user operations.
 * It includes functions to verify platform user login.
 */
const platformUserService = require('../services/platformUserService');
const { validateName } = require('../utilities/sanitize');

/**
 * handlers for the verifyPlatformUserLogin function
 * assign the parameter needed from request body to variable
 * @returns {Object}
 *   An object containing the platform_user_id, role_code, role, and JWT token.
 *   - platform_user_id: Unique identifier for the platform user.
 *   - role_code: Code corresponding to the user's role.
 *   - role: The role of the platform user (e.g., student).
 *   - token: JWT token for the platform user.
 */
const verifyPlatformUserLogin = async (request, response) => {
  // for debugging purpose
  console.log("verifyPlatformUserLogin called");
  console.log("Raw request body:", request.body);

  try {
    const { email, password } = request.body;
    const result = await platformUserService.verifyPlatformUserLogin(email, password);
    response.status(200).json(result);
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyPlatformUserLogin,
};