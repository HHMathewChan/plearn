/**
 * JWT Service
 * This service provides methods to generate JSON Web Tokens (JWT).
 * It uses the 'jsonwebtoken' library for handling JWT operations.
 */
const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token with the given payload and secret.
 * @param {Object} payload - The payload to include in the token.
 * @returns {string} The generated JWT token.
 */
const generateToken = (payload) => {
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN ||'24h'} // Default expiration time
    );
};

module.exports = {
    generateToken
};