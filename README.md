# 🔗 URL Shortener
 
A simple URL shortening service built with Node.js and Express.js. Users can submit a long URL, receive a shortened version, and get redirected to the original URL when they visit the short link.
 
## Features
 
- Generate short, unique codes for long URLs
- Redirect from short URL to original URL
- URL validation (rejects invalid/malformed URLs)
- Duplicate detection (returns existing short code if URL was already shortened)
- Simple, responsive web interface
## Tech Stack
 
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **ID Generation:** nanoid
- **Frontend:** HTML, CSS, JavaScript (vanilla)
## Project Structure
 
```
url-shortener-node/
├── public/
│   └── index.html      # Frontend UI
├── app.js               # Express server and routes
├── db.js                # Database connection and schema
├── package.json
└── urls.db               # SQLite database (generated at runtime)
```
 
## API Endpoints
 
| Method | Endpoint       | Description                          |
|--------|----------------|---------------------------------------|
| POST   | `/shorten`     | Accepts a long URL, returns a short URL |
| GET    | `/:code`       | Redirects to the original URL          |
 
### Example Request
 
```json
POST /shorten
{
  "original_url": "https://www.example.com/some/very/long/path"
}
```
 
### Example Response
 
```json
{
  "short_url": "http://localhost:3000/xY3kP9",
  "original_url": "https://www.example.com/some/very/long/path"
}
```
 
## Setup & Installation
 
1. Clone the repository
```
   git clone https://github.com/rummanch964-ux/url-shortener.git
   cd url-shortener
```
2. Install dependencies
```
   npm install
```
3. Start the server
```
   node app.js
```
4. Open in browser
```
   http://localhost:3000
```
 
## Notes
 
This project was built as part of a backend development internship task.
 
