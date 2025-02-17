# Finance Management Application

This is a Finance Management Application built with a React frontend and an Express backend. It allows users to add, edit, delete, and view transactions. The application also provides a chart to visualize monthly expenses.

## Features

- Add new transactions
- Edit existing transactions
- Delete transactions
- View a list of all transactions
- Visualize monthly expenses with a bar chart

## Technologies Used

- Frontend: React, Zustand, Recharts, React Hot Toast
- Backend: Express, Mongoose, MongoDB
- Other: Vite, Nodemon, dotenv, cors

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/finance-management-app.git
   cd finance-management-app
   ```

2. Install dependencies for the backend:

   ```sh
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:

   ```sh
   cd ../frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the Application

1. Start the backend server:

   ```sh
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```sh
   cd ../frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

```
finance-management-app/
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   │   └── transaction-controller.js
│   │   ├── lib/
│   │   │   └── db-connect.js
│   │   ├── models/
│   │   │   └── transaction-model.js
│   │   ├── routes/
│   │   │   └── transaction-routes.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── input.jsx
│   │   │       └── table.jsx
│   │   ├── pages/
│   │   │   ├── addTransaction.jsx
│   │   │   ├── chart.jsx
│   │   │   └── transactionList.jsx
│   │   ├── store/
│   │   │   └── financeStore.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

## License

This project is licensed under the MIT License.
