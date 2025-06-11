const database = require('../database');

const createHasStudentProfileIn = async (student_code, platform_user_id) => {
    // for debugging purpose
    // console.log("createHasStudentProfileIn called");
    // console.log("student_code:", student_code);
    // console.log("platform_user_id:", platform_user_id);
    return database.none(
        `INSERT INTO hasstudentprofilein 
            (student_code, platform_user_id)
         VALUES 
            ($1, $2)`,
        [student_code, platform_user_id]
    );
}

/**
 * retrieve the student_code by platform_user_id
 * @param {string} platform_user_id - The ID of the platform user.
 * @returns {Promise<string>} - The student_code associated with the platform user ID.
 */
const getStudentCodeByPlatformUserId = async (platform_user_id) => {
    // for debugging purpose
    // console.log("getStudentCodeByPlatformUserId called");
    // console.log("platform_user_id:", platform_user_id);
    const result = await database.one(
        `SELECT student_code 
         FROM hasstudentprofilein 
         WHERE platform_user_id = $1`,
        [platform_user_id]
    );
    return result.student_code;
}

module.exports = {
    createHasStudentProfileIn,
    getStudentCodeByPlatformUserId
}
