const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const r2Client = require('./r2Client');

async function generateSignedCourseUrl(filename) {
    //for debugging purpose
    console.log("generateSignedCourseUrl called with filename:", filename);
    // typeof filename check
    if (typeof filename !== 'string') {
        throw new Error('Filename must be a string');
    }
    const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: filename,
  });

  const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 }); // 1 hour
  return signedUrl;
}

module.exports = { generateSignedCourseUrl };