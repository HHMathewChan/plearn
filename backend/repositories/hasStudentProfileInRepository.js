const database = require('../database');

const createHasStudentProfileIn = async (student_code, platform_user_id) => {
    // for debugging purpose
    console.log("createHasStudentProfileIn called");
    console.log("student_code:", student_code);
    console.log("platform_user_id:", platform_user_id);
    return database.none(
        `INSERT INTO hasstudentprofilein 
            (student_code, platform_user_id)
         VALUES 
            ($1, $2)`,
        [student_code, platform_user_id]
    );
}


module.exports = {
    createHasStudentProfileIn,
}
