# Mock E-Com Cart — Vibe Commerce Screening

Simple full-stack shopping cart app demonstrating product listing, cart management, and a mock checkout flow.

## Tech
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Communication: REST APIs

## Structure
- /backend — Express API, models, seeder
- /frontend — React app

## Setup (local)

### Backend
1. cd backend
2. cp .env.example .env (edit MONGODB_URI if needed)
3. npm install
4. npm run seed    # populate mock products
5. npm run dev     # start server (nodemon) on PORT (default 5000)

### Frontend
1. cd frontend
2. cp .env.example .env
3. npm install
4. npm start       # opens on http://localhost:3000

## APIs
- GET /api/products
- GET /api/cart
- POST /api/cart { productId, qty }
- DELETE /api/cart/:id
- POST /api/cart/checkout { cartItems, name, email } => returns receipt

## Notes & Bonus
- Cart is persisted server-side (CartItem collection). To support multiple users, add `userId` to CartItem.
- Error handling returns JSON 4xx/5xx messages.
- Bonus: can integrate Fake Store API to seed products instead of local seed script.

## Screenshots
(Include screenshots here after you run locally: product grid, cart view, receipt modal.)

## Deploy (GitHub)
- Push repo to GitHub with /backend and /frontend.
- For this screening, hosting is not required; provide instructions and screenshots.

