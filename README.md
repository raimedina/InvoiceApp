📦 InvoiceApp

InvoiceApp is a modern and responsive web application built with React, Redux, and CSS Modules. It simplifies the management of invoices, providing features like filtering, sorting, and CRUD operations.

🚀 Installation

Install the application dependencies:

npm install
# or
yarn install

📂 Dependencies

React ^19.0.0

Redux Toolkit ^2.5.0

React Router DOM ^7.1.2

React Icons ^5.4.0

CSS Modules

Vite ^6.0.7

To check all installed dependencies:

npm list --depth=0

💻 Usage Example

Example of using the OrderByButton component:

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

🎨 Button Variants

Sort By: "clientName" | "amount" | "issueDate" | "dueDate"

Sort Direction: "asc" | "desc"

📂 Project Structure

src/
├── components/       # Reusable UI components (Button, Card, Filter, OrderBy)
├── screens/          # Application screens (Dashboard, NewInvoice, EditInvoice)
├── redux/            # Redux slices and store configuration
├── data/             # JSON data for initial invoices
├── styles/           # Global and component-specific styles (CSS Modules)
└── App.js            # Main application component

📖 Documentation

Documentation will be improved and expanded in future updates.

🔎 Running the Project

npm run dev

Access the app at:

http://localhost:5173/

🧪 Testing (Coming Soon)

Tests will be implemented using Jest and React Testing Library in future updates.

🤝 Contributing

Contributions are welcome! Feel free to open Issues or submit Pull Requests.

For details, check the Contribution Guide.

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

🚧 Project Status

🛠️ In development – Version 0.1.0

📅 Planned updates will be added soon.

📞 Contact

📧 Email: raiza.silveira.medina@gmail.com

🖤 Thank you for using InvoiceApp!