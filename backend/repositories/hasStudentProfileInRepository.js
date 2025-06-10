const database = require('../database');

const createHasStudentProfileIn = async (student_code, platform_user_id) => {
    return database.any(
        `INSERT INTO platformuser 
            (student_code, platform_user_id)
         VALUES 
            ($1, $2)`,
        [student_code, platform_user_id]
    );
}


module.exports = {
    createHasStudentProfileIn,
}
