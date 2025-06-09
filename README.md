# Insurance API Server

A simple Express.js + TypeScript backend project that simulates a policy and product insurance service using mock data. The server supports authenticated and public endpoints with basic CRUD operations on policies.

---

## 📌 Features

- 🚀 Built with Express.js and TypeScript
- 🔐 API Key authentication for protected routes
- 🧠 In-memory data (no database required)
- 🧪 Unit tests using Jest
- 📁 Clean folder structure with separation of concerns
- 📄 Postman collection for testing APIs

---

## 📂 Project Structure

```
├── src
│   ├── controllers         # Route logic handlers
│   ├── data                # JSON mock data
│   ├── middlewares         # Authentication middleware
│   ├── models              # Type definitions
│   ├── routes              # Express routes
│   └── server.ts           # App entry point
├── tests                   # Jest test cases
├── README.md               # Project documentation
├── InsuranceAPI.postman_collection.json
├── package.json
├── tsconfig.json
└── jest.config.js
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js >= 16
- npm or yarn

### Step-by-step

1. **Clone the repository**
```bash
git clone https://github.com/manjesh127/DLG-Assignment.git
cd DLG-Assignment
```

2. **Install dependencies**
```bash
npm install
```

3. **Run in development mode**
```bash
npm start
```
App will be served at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

5. **Start production server**
```bash
npm start
```

---

## 🧪 Running Tests

Unit tests are written using Jest.
To run them:
```bash
npm test
```

---

## 🔐 Authentication

Protected endpoints require an API key:
- Header: `x-api-key`
- Value: `my-static-api-key`

Make sure to pass this header for `POST`, `PUT`, and `DELETE` routes.

---

## 🛠 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/policies/:id` | Get a single policy by ID (includes full product info) |
| GET | `/api/policies?customerName=John` | Get all policies by customer name |

### Authenticated Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/policies` | Create a new policy |
| PUT | `/api/policies/:id` | Update a policy by ID |
| DELETE | `/api/policies/:id` | Delete a policy by ID |

---

## 🧪 Postman Collection

Import the `InsuranceAPI.postman_collection.json` file in Postman to test all endpoints interactively.

---

## 💡 Approach

- Used `TypeScript` throughout for type safety.
- Policies and Products are stored in memory by loading `policies.json` and `products.json` at server start.
- Middleware is used to validate API keys for protected endpoints.
- Controllers handle business logic, separate from route declarations.
- Jest tests validate all core functionality.

---

## 🧑‍💻 Author
Manjesh Singh
