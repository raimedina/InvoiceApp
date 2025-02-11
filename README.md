# 📦 InvoiceApp  

**InvoiceApp** is a modern and responsive web application built with **React**, **Redux**, and **CSS Modules**. It simplifies invoice management by providing features like filtering, sorting, and full **CRUD operations** with a **backend API** using **Express.js** and **PostgreSQL via Prisma**.

---

## 🚀 Installation  

Clone the repository and install the dependencies:  

```sh
git clone https://github.com/your-repository/invoiceapp.git
cd invoiceapp
npm install
# or
yarn install
```

---

## 📂 Dependencies  

The project relies on the following key dependencies:  

### **Frontend:**  

- `react` 19.0.0  
- `react-dom` 19.0.0  
- `react-router-dom` 7.1.2  
- `@reduxjs/toolkit` 2.5.0  
- `react-redux` 9.2.0  
- `react-icons` 5.4.0  
- `vite` 6.0.7  

### **Backend:**  

- `express` ^4.18.2  
- `prisma` ^6.3.1  
- `postgresql` (Database)  
- `cors`, `dotenv` (Configuration)  

To check all installed dependencies:  

```sh
npm list --depth=0
```

---

## ⚙️ Backend Setup  

### **1️⃣ Start PostgreSQL**  

Ensure PostgreSQL is installed and running:  

```sh
sudo systemctl start postgresql
```

### **2️⃣ Set up environment variables**  

Create a `.env` file in the backend directory and configure the database URL:  

```sh
PORT=5001
DATABASE_URL="postgresql://user:yourpassword@localhost:5432/invoiceapp"
```

### **3️⃣ Run migrations and seed the database**  

```sh
npx prisma migrate dev --name init
npx prisma db seed
```

### **4️⃣ Start the backend**  

```sh
npm run dev
```

The backend will be available at:  
👉 [http://localhost:5001](http://localhost:5001)  

---

## 💻 Frontend Usage  

To start the frontend, run:  

```sh
npm run dev
```

Access the app at:  
👉 [http://localhost:5173/](http://localhost:5173/)  

---

## 🔄 How the App Works  

- Invoices are fetched from the backend via an API (`http://localhost:5001/invoices`).  
- Users can **Create, Update, and Delete** invoices.  
- **Sorting and filtering** options allow better organization of invoices.  
- The app follows **Redux** for state management and **Prisma ORM** for database interactions.  

---

## 🎨 Button Variants  

The `OrderByButton` component allows sorting invoices by:  

- `"clientName"`  
- `"amount"`  
- `"issueDate"`  
- `"dueDate"`  

Sorting directions:  

- `"asc"` (ascending)  
- `"desc"` (descending)  

### Example Usage:  

```jsx
import React from 'react';
import OrderByButton from './components/OrderByButton/OrderByButton';

const App = () => {
  return (
    <div>
      <OrderByButton />
    </div>
  );
};

export default App;
```

---

## 📂 Project Structure  

```plaintext
invoiceapp/
├── backend/
│   ├── invoice-api/       # Backend API using Express.js & Prisma
│   ├── prisma/            # Database schema & migrations
│   ├── .env               # Environment variables
│   ├── server.js          # Express.js backend server
│   ├── package.json       # Backend dependencies
│   ├── eslint.config.js   # ESLint configuration
│   ├── package-lock.json  # Package lock file
├── node_modules/          # Node dependencies
├── public/                # Public assets
├── src/
│   ├── assets/            # Static assets like images, fonts
│   ├── components/        # Reusable UI components (Button, Card, Filter, OrderBy)
│   ├── redux/             # Redux slices and store configuration
│   ├── screens/           # Application screens (Dashboard, NewInvoice, EditInvoice)
│   ├── styles/            # Global and component-specific styles (CSS Modules)
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   ├── main.jsx           # React entry point
├── README.md              # Project documentation

```

---

## 📖 API Endpoints  

| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| `GET`  | `/invoices`     | Fetch all invoices    |
| `POST` | `/invoices`     | Create a new invoice  |
| `PUT`  | `/invoices/:id` | Update an invoice     |
| `DELETE` | `/invoices/:id` | Delete an invoice     |

---

## 🧪 Testing (Coming Soon)  

Tests will be implemented using **Jest** and **React Testing Library** in future updates.  

---

## 🤝 Contributing  

Contributions are welcome! Feel free to open **Issues** or submit **Pull Requests**.  

For details, check the **Contribution Guide**.  

---

## 📜 License  

This project is licensed under the **MIT License**. See the `LICENSE` file for details.  

---

## 🚧 Project Status  

🛠️ **In development – Version 0.2.0**  

📅 **Planned Updates:**  

- 🔹 `20/02` - New input component & UI/UX improvements + CSS refinements  

---

## 📞 Contact  

📧 **Email:** [raiza.silveira.medina@gmail.com](mailto:raiza.silveira.medina@gmail.com)  

💙 **Thank you for using InvoiceApp! 🚀**
