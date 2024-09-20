## 📚 Bookstore API - Ace Assessment

A Node.js-based API for managing a bookstore, featuring user authentication, a book catalog, a shopping cart, and order management.

### Features

- User Authentication: Register, login.
- Book Catalog: Browse and get book details.
- Shopping Cart: Add, delete, and view items in the cart.
- Order Management: Place orders, check order status, and manage stock.

### Tech Stack

- Backend: Node.js, Express
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT (JSON Web Tokens)

---

### Getting Started

#### Prerequisites

Make sure you have the following installed:

- Node.js (v12 or higher)
- PostgreSQL

#### Installation

1. Clone the repository:

```bash
git clone https://github.com/raj-rangani/ace-assessment.git
cd ace-assessment
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables: Create a .env file in the root directory and add the following:

```env
PORT=3000
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<dbname>?schema=public"
ACCESS_TOKEN_SECRET=secret
ACCESS_TOKEN_EXPIRY=1d
```

4. Set up the database: Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

5. Seed the database: Seed the database with initial data by running:

```bash
npx prisma db seed
```

6. Start the Server:

```bash
pnpm start
```

---

### API Endpoints

#### Authentication

- `POST` /api/v1/auth/register - Register a new user
- `POST` /api/v1/auth/login - Login and get a JWT token

#### Books

- `GET` /api/v1/books - Get all available books
- `GET` /api/v1/books/:id - Get Book Details

#### Cart

- `GET` /api/v1/cart - Get user's cart items
- `POST` /api/v1/cart - Add a book to the cart
- `DELETE` /api/v1/cart/:itemId - Removes a book from the cart

#### Orders

- `POST` /api/v1/orders - Place an order
- `GET` /api/v1/orders - Get user's orders
- `GET` /api/v1/orders/:id - Get order details

---
