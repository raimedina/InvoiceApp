import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateInvoice } from "../../redux/invoiceSlice";
import styles from "./EditInvoice.module.css";

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const invoice = useSelector((state) =>
    state.invoice.list.find((inv) => inv.invoiceId === invoiceId)
  );

  const [invoiceData, setInvoiceData] = useState(invoice || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (invoice) {
      setInvoiceData(invoice);
    }
  }, [invoice]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };


  const validateFields = () => {
    const requiredFields = ["invoiceNumber", "clientName", "status"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!invoiceData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    return newErrors;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateInvoice({ invoiceId, updatedData: invoiceData }));
    navigate("/");
  };


  const handleCancel = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Invoice</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
       
        <label>Invoice Number*</label>
        <input
          type="text"
          name="invoiceNumber"
          value={invoiceData.invoiceNumber || ""}
          onChange={handleChange}
          placeholder="Ex: INV-001"
        />
        {errors.invoiceNumber && <span className={styles.error}>{errors.invoiceNumber}</span>}

        <label>Client Name*</label>
        <input
          type="text"
          name="clientName"
          value={invoiceData.clientName || ""}
          onChange={handleChange}
          placeholder="Client Name"
        />
        {errors.clientName && <span className={styles.error}>{errors.clientName}</span>}

      
        <label>Status*</label>
        <select
          name="status"
          value={invoiceData.status || ""}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        {errors.status && <span className={styles.error}>{errors.status}</span>}

      
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.updateButton}>Update Invoice</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
