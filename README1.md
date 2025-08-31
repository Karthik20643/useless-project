# CUCEK Photography Club - File Upload Backend
Overview
This backend service enables uploading, storing, and managing photos for the CUCEK Photography Club website.
It uses a multi-cloud strategy:

Primary storage: Imgur
 (free, fast, simple)

Fallback storage: Cloudinary
 (powerful transformations & unlimited quota)

If Imgur quota (50 uploads/hour) is exceeded, the system automatically switches to Cloudinary.

The uploaded photo links are stored in NeonDB (Postgres) and managed via CRUD operations.

Features

Upload images via Multer middleware

Store in Imgur (default) or Cloudinary (fallback)

Save public image links in NeonDB

Perform CRUD operations:

Create → Upload photo & save metadata

Read → Fetch all photo records

Update → Modify metadata (title)

Delete → Remove a photo record

Tech Stack

Node.js + Express – Backend framework

Multer – File upload middleware

Imgur API – Primary image hosting

Cloudinary API – Secondary image hosting

NeonDB (PostgreSQL) – Persistent database
project-root/
│── server.js
│── package.json
│── .env
│
├── config/
│   ├── db.js
│   ├── cloudinary.js
│   └── imgur.js
│
├── routes/
│   └── photoRoutes.js
│
├── controllers/
│   └── photoController.js
│
├── models/
│   └── photoModel.js
│
└── middleware/
    └── upload.js

```
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  storage_provider VARCHAR(50) NOT NULL, -- 'imgur' or 'cloudinary'
  created_at TIMESTAMP DEFAULT NOW()
);
```
```
Environment Variables (.env)
PORT=5000

# NeonDB
DATABASE_URL=postgres://username:password@host/dbname

# Imgur
IMGUR_CLIENT_ID=your_imgur_client_id

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

API Endpoints
1️⃣ Upload Photo (Create)

Endpoint:

POST /photos


Request Type: multipart/form-data

Field: file → image file

Field: title → photo title

Workflow:

Check how many images uploaded to Imgur in the last hour

If < 50 → upload to Imgur

Else → upload to Cloudinary

Save link + provider in DB

Example Request (Frontend):
```
const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("title", "My Best Shot");

fetch("http://localhost:5000/photos", {
  method: "POST",
  body: formData
}).then(res => res.json()).then(console.log);

```
Response JSON (Imgur):
```
{
  "id": 1,
  "title": "My Best Shot",
  "file_url": "https://i.imgur.com/abc123.jpg",
  "storage_provider": "imgur",
  "created_at": "2025-08-29T12:34:56.789Z"
}

```
Response JSON (Cloudinary):
```
{
  "id": 2,
  "title": "Another Shot",
  "file_url": "https://res.cloudinary.com/demo/image/upload/v1690000000/photo.jpg",
  "storage_provider": "cloudinary",
  "created_at": "2025-08-29T12:40:22.456Z"
}

```
Get  Photos (Read) : GET /photos
response (JSON) : 
```
[
  {
    "id": 1,
    "title": "My Best Shot",
    "file_url": "https://i.imgur.com/abc123.jpg",
    "storage_provider": "imgur",
    "created_at": "2025-08-29T12:34:56.789Z"
  },
  {
    "id": 2,
    "title": "shot after limit reached",
    "file_url": "https://res.cloudinary.com/demo/image/upload/v1690000000/photo.jpg",
    "storage_provider": "cloudinary",
    "created_at": "2025-08-29T12:40:22.456Z"
  }
]

```
Update Photo(update)
Endpoint:   PUT /photos/:id

Request JSON:
```
{
  "title": "Updated Photo Title"
}

```
Response JSON:
```
{
  "id": 1,
  "title": "Updated Photo Title",
  "file_url": "https://i.imgur.com/abc123.jpg",
  "storage_provider": "imgur",
  "created_at": "2025-08-29T12:34:56.789Z"
}

```
Delete Photo (Delete)
Endpoint: ```  DELETE /photos/:id ```
response JSON :
```
{
  "message": "Photo deleted"
}
```
Imgur Upload Details [imgur source](https://apidocs.imgur.com/)

Endpoint: POST https://api.imgur.com/3/image

Auth: Client-ID <IMGUR_CLIENT_ID> in header

Body: Base64 encoded image or file stream

Response JSON model :
```
{
  "data": {
    "id": "abc123",
    "link": "https://i.imgur.com/abc123.jpg"
  },
  "success": true,
  "status": 200
}

```
Cloudinary Upload Details

SDK: cloudinary.uploader.upload(filePath, { resource_type: "image" })

Response JSON model:
```
{
  "asset_id": "12345",
  "public_id": "photo",
  "secure_url": "https://res.cloudinary.com/demo/image/upload/v1690000000/photo.jpg"
}

```
 Request to  Response Flow : 

`** Frontend sends photo file → POST /photos

Multer handles file storage temporarily

Backend checks Imgur upload count (last 1 hour)

If quota not exceeded → upload to Imgur API

Else → upload to Cloudinary API

Store resulting file_url + provider in NeonDB

Return saved photo JSON to frontend **`


Run Locally : 
```
# Install dependencies
npm install

# Start server
npm run dev

```


