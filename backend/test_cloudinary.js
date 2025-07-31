
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path');

// This script tests the direct connection to Cloudinary by uploading a local file.

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use https
});

console.log('Running Cloudinary connection test...');
console.log('Cloud Name:', cloudinary.config().cloud_name);

// Path to a local image to test the upload
const imageToUpload = path.join(__dirname, '../frontend/buildmyresume/src/assets/hero-img.png');
console.log('Attempting to upload:', imageToUpload);

// Perform the upload
cloudinary.uploader.upload(imageToUpload, {
  public_id: 'test_upload_from_script'
})
.then(result => {
  console.log('SUCCESS: Cloudinary upload successful!');
  console.log('Public URL:', result.secure_url);
  console.log('--- Result ---');
  console.log(result);
})
.catch(error => {
  console.error('ERROR: Cloudinary upload failed.');
  console.error('--- Error Details ---');
  console.error(error);
});
