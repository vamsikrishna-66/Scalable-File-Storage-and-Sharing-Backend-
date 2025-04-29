# Scalable File Storage and Sharing Backend

This project is a fully functional, scalable backend system for secure file storage and sharing, built using Node.js, Express, MongoDB, and AWS S3.

It allows users to register, log in securely using JWT authentication, upload files to AWS S3, store metadata in MongoDB, share uploaded files with other users, and view or download files they own or that were shared with them.

What This Project Does:

Allows users to register and log in securely with hashed passwords and JSON Web Tokens

Lets users upload files, which are stored in AWS S3 buckets

Stores file metadata (filename, URL, uploader, sharedWith) in MongoDB

Enables users to list their uploaded files

Supports sharing files with others via email

Lets users view or download files shared with them or uploaded by them

All core routes are secured using middleware to validate JWTs

How to Run the Project Locally:

Clone the repository: git clone https://github.com/your-username/file-storage-backend.git cd file-storage-backend

Install dependencies: npm install

Create a .env file in the root directory with the following values:

PORT=5000
MONGO_URI=mongodb://localhost:27017/file_sharing_db
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name
JWT_SECRET=your_custom_jwt_secret

Make sure MongoDB is running locally using: mongod

Start the backend server: npm run dev

The backend will start on http://localhost:5000

Folder Structure:

app.js - Main app file
.env - Your private environment variables
.env.example - Template file for env setup
config/awsS3.js - AWS S3 configuration
models/File.js - File metadata schema
models/User.js - User authentication schema
routes/authRoutes.js - Register and login routes
routes/fileRoutes.js - Upload, list, share, and access files
middlewares/authMiddleware.js - JWT verification middleware
package.json - Project configuration and dependencies
README.md - This documentation

API Endpoints:

Authentication: POST /api/auth/register - Register a new user
POST /api/auth/login - Log in and receive a token

File Handling: POST /api/files/upload - Upload a file (protected)
GET /api/files/my-files - Get files uploaded by the current user
POST /api/files/share - Share a file by email
GET /api/files/shared-with-me - View files shared with the current user
GET /api/files/:fileId - Access a file (only if owned or shared)

All routes except /auth require Authorization: Bearer <token> in the header.

Typical Usage Flow:

User registers via /api/auth/register

Logs in to get JWT token

Uploads files via /api/files/upload

Lists their uploads with /api/files/my-files

Shares a file with another email via /api/files/share

Recipient sees the file in /api/files/shared-with-me

Both can view or download using /api/files/:fileId

Technologies Used:

Node.js and Express for backend logic

MongoDB and Mongoose for database and schema management

Multer for file upload handling

AWS SDK for uploading to Amazon S3

bcryptjs for secure password hashing

JSON Web Tokens (JWT) for authentication

dotenv for configuration management

Other Notes:

MongoDB must be running either locally or via MongoDB Atlas

AWS credentials must belong to an IAM user with appropriate S3 permissions

This project is backend-only but ready to integrate with any frontend (React, Vue, Angular, etc.)
