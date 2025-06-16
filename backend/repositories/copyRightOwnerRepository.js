/**
 * This repository handles the CopyrightOwner table.
 * It provides methods to get all data for a specific copyright owner.
 */
const database = require('../database');

/**
 * Get a copyright owner by their ID.
 * @function getCopyrightOwnerById
 * @param {string} copyrightOwnerId - The unique identifier for the copyright owner (UUID).
 * @returns {Promise<Object>} A promise that resolves to the copyright owner object.
 * @property {string} id - The unique identifier for the copyright owner.
 * @property {string} name - The name of the copyright owner.
 * @property {string} type - The type of the copyright owner (e.g., individual, organization).
 * @property {string} contact_email - The contact email of the copyright owner.
 * @property {string} license_type - The type of license associated with the copyright owner.
 * @property {string} license_url - The URL to the license information.
 */
const getCopyrightOwnerById = async (copyrightOwnerId) => {
    try {
        // Query to get a copyright owner by their ID
        const result = await database.query(
            'SELECT * FROM copyrightowner WHERE id = $1',
            [copyrightOwnerId]
        );
        
        console.log('Query result for copyright owner ID', copyrightOwnerId, ':', result);
        
        // With pg-promise, result is directly the array of rows
        if (result.length === 0) {
            throw new Error('No copyright owner found for the given ID');
        }
        // Return the copyright owner object
        return result[0];
    } catch (error) {
        // Log the error and rethrow it
        console.error('Error fetching copyright owner by ID:', error);
        throw error;
    }
};

module.exports = {
    getCopyrightOwnerById
};