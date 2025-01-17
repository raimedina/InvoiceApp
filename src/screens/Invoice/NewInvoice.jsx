import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../redux/invoiceSlice";
import { useNavigate } from "react-router-dom";
import styles from "./NewInvoice.module.css";


const tagOptions = ["Urgent", "Recurring", "Delayed", "Discount", "Priority"];
const statusOptions = ["Pending", "Paid", "Overdue", "Draft"];
const paymentMethodOptions = ["Cash", "Credit Card", "Paypal", "Bank Transfer"];
const currencyOptions = ["USD", "EUR", "BRL"];
const categoryOptions = ["Maintenance", "Development", "Design", "Consulting"];

const NewInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    status: "",
    issueDate: "",
    dueDate: "",
    paymentDate: "",
    amount: "",
    currency: "",
    discount: "",
    tax: "",
    paymentMethod: "",
    category: "",
    tags: [],
    notes: "",
  });

  const [errors, setErrors] = useState({});

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  
  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setInvoiceData({ ...invoiceData, tags: selectedTags });
  };

  
  const validateFields = () => {
    const requiredFields = [
      "invoiceNumber",
      "clientName",
      "clientEmail",
      "amount",
      "issueDate",
      "dueDate",
      "status",
      "paymentMethod",
      "currency",
      "category",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!invoiceData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (isNaN(invoiceData.amount) || parseFloat(invoiceData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please fill in all required fields.");
      return;
    }

    const paymentDate = invoiceData.status === "Paid" ? new Date().toISOString() : null;

    const newInvoice = {
      ...invoiceData,
      invoiceId: Date.now().toString(),
      amount: parseFloat(invoiceData.amount),
      discount: parseFloat(invoiceData.discount) || 0,
      tax: parseFloat(invoiceData.tax) || 0,
      paymentDate,
    };

    dispatch(addInvoice(newInvoice));
    navigate("/");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this invoice?")) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Invoice</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.inputGroup}>
          <label>Invoice Number*</label>
          <input
            type="text"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
            placeholder="Ex: INV-001"
          />
          {errors.invoiceNumber && (
            <span className={styles.error}>{errors.invoiceNumber}</span>
          )}
        </div>

       
        <div className={styles.inputGroup}>
          <label>Client Name*</label>
          <input
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleChange}
            placeholder="Client Name"
          />
          {errors.clientName && (
            <span className={styles.error}>{errors.clientName}</span>
          )}
        </div>

       
        <div className={styles.inputGroup}>
          <label>Client Email*</label>
          <input
            type="email"
            name="clientEmail"
            value={invoiceData.clientEmail}
            onChange={handleChange}
            placeholder="Client Email"
          />
          {errors.clientEmail && (
            <span className={styles.error}>{errors.clientEmail}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Status*</label>
          <select
            name="status"
            value={invoiceData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        
      
         <div className={styles.inputGroup}>
          <label>Issue Date*</label>
          <input
            type="date"
            name="issueDate"
            value={invoiceData.issueDate}
            onChange={handleChange}
          />
        </div>

      
        <div className={styles.inputGroup}>
          <label>Due Date*</label>
          <input
            type="date"
            name="dueDate"
            value={invoiceData.dueDate}
            onChange={handleChange}
          />
        </div>
    
        <div className={styles.inputGroup}>
          <label>Currency*</label>
          <select
            name="currency"
            value={invoiceData.currency}
            onChange={handleChange}
          >
            <option value="">Select Currency</option>
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

       
        <div className={styles.inputGroup}>
          <label>Amount*</label>
          <input
            type="number"
            name="amount"
            value={invoiceData.amount}
            onChange={handleChange}
            placeholder="Invoice Amount"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Payment Method*</label>
          <select
            name="paymentMethod"
            value={invoiceData.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            {paymentMethodOptions.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <span className={styles.error}>{errors.paymentMethod}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={invoiceData.discount}
            onChange={handleChange}
            placeholder="Discount"
          />
        </div>
      
        <div className={styles.inputGroup}>
          <label>Tax (%)</label>
          <input
            type="number"
            name="tax"
            value={invoiceData.tax}
            onChange={handleChange}
            placeholder="Tax"
          />
        </div>

        
        <div className={styles.inputGroup}>
          <label>Category*</label>
          <select
            name="category"
            value={invoiceData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

     
        <div className={styles.inputGroup}>
          <label>Tags</label>
          <select
            name="tags"
            multiple
            value={invoiceData.tags}
            onChange={handleTagChange}
          >
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
       
        {invoiceData.status === "Paid" && (
          <div className={styles.inputGroup}>
            <label>Payment Date</label>
            <input
              type="text"
              value={new Date().toLocaleDateString()}
              readOnly
            />
          </div>
        )}

       
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Save Invoice
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;
