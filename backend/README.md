# SkillTwin Backend

A scalable Node.js/Express/MongoDB backend for SkillTwin (tech job support, project help, proxy interviews, and training programs).

## Features

- JWT authentication (register/login)
- Inquiry form endpoint
- Training enrollment endpoint
- Admin endpoints for leads/enrollments
- Modular MVC structure

## Project Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── services/ (optional)
├── middleware/
├── config/
├── utils/
├── app.js
├── server.js
├── .env.example
```

## Setup

1. `cd backend`
2. `cp .env.example .env` and fill in your values
3. `npm install`
4. `npm run dev` (uses nodemon)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing

## API Endpoints

### Auth

- `POST /api/auth/register` `{ name, email, password }`
- `POST /api/auth/login` `{ email, password }`

### Inquiry

- `POST /api/inquiry` `{ name, tech, helpType, contact }`

### Enrollment

- `POST /api/enroll` `{ name, email, training, schedule?, message? }`

### Admin (JWT admin required)

- `GET /api/admin/leads`
- `GET /api/admin/enrollments`

## Notes

- CORS enabled for `http://localhost:5173`
- All responses are JSON with status codes
- Use JWT in `Authorization: Bearer <token>` for protected routes
