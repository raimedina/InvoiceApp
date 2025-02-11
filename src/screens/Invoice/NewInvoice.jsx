import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../redux/invoiceSlice";
import { useNavigate } from "react-router-dom";
import styles from "./NewInvoice.module.css";

const NewInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    status: "",
    issueDate: "",
    dueDate: "",
    amount: "",
    currency: "USD",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const newInvoice = {
        ...invoiceData,
        amount: parseFloat(invoiceData.amount),
        discount: parseFloat(invoiceData.discount) || 0,
        tax: parseFloat(invoiceData.tax) || 0,
        issueDate: invoiceData.issueDate
          ? new Date(invoiceData.issueDate).toISOString()
          : null,
        dueDate: invoiceData.dueDate
          ? new Date(invoiceData.dueDate).toISOString()
          : null,
        paymentDate:
          invoiceData.status === "Paid" ? new Date().toISOString() : null,
      };

      await dispatch(addInvoice(newInvoice)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("❌ Erro ao adicionar invoice:", error);
      alert("Error adding invoice: " + error.message);
    } finally {
      setLoading(false);
    }
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
        <label>Invoice Number*</label>
        <input
          type="text"
          name="invoiceNumber"
          value={invoiceData.invoiceNumber}
          onChange={handleChange}
        />
        {errors.invoiceNumber && (
          <span className={styles.error}>{errors.invoiceNumber}</span>
        )}

        <label>Client Name*</label>
        <input
          type="text"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleChange}
        />
        {errors.clientName && (
          <span className={styles.error}>{errors.clientName}</span>
        )}

        <label>Client Email*</label>
        <input
          type="email"
          name="clientEmail"
          value={invoiceData.clientEmail}
          onChange={handleChange}
        />
        {errors.clientEmail && (
          <span className={styles.error}>{errors.clientEmail}</span>
        )}

        <label>Status*</label>
        <select
          name="status"
          value={invoiceData.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        {errors.status && <span className={styles.error}>{errors.status}</span>}

        <label>Issue Date*</label>
        <input
          type="date"
          name="issueDate"
          value={invoiceData.issueDate}
          onChange={handleChange}
        />
        {errors.issueDate && (
          <span className={styles.error}>{errors.issueDate}</span>
        )}

        <label>Due Date*</label>
        <input
          type="date"
          name="dueDate"
          value={invoiceData.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && (
          <span className={styles.error}>{errors.dueDate}</span>
        )}

        <label>Amount*</label>
        <input
          type="number"
          name="amount"
          value={invoiceData.amount}
          onChange={handleChange}
        />
        {errors.amount && <span className={styles.error}>{errors.amount}</span>}

        <label>Payment Method*</label>
        <select
          name="paymentMethod"
          value={invoiceData.paymentMethod}
          onChange={handleChange}
        >
          <option value="">Select Payment Method</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Paypal">Paypal</option>
        </select>
        {errors.paymentMethod && (
          <span className={styles.error}>{errors.paymentMethod}</span>
        )}

        <label>Category*</label>
        <input
          type="text"
          name="category"
          value={invoiceData.category}
          onChange={handleChange}
        />
        {errors.category && (
          <span className={styles.error}>{errors.category}</span>
        )}

        <label>Notes</label>
        <textarea
          name="notes"
          value={invoiceData.notes}
          onChange={handleChange}
        />

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Invoice"}
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
