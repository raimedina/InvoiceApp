import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './screens/Home/Home';
import NewInvoice from './screens/Invoice/NewInvoice';
import EditInvoice from './screens/Invoice/EditInvoice';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-invoice" element={<NewInvoice />} />
        <Route path="/edit-invoice/:invoiceId" element={<EditInvoice />} />
      </Routes>
    </Router>
  );
};

export default App;
