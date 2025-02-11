import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateInvoice, fetchInvoices } from "../../redux/invoiceSlice";
import styles from "./EditInvoice.module.css";

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list} = useSelector((state) => state.invoice);
  const [invoiceData, setInvoiceData] = useState(null);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (!list.length) {
      dispatch(fetchInvoices());
    }
  }, [dispatch, list.length]);

  useEffect(() => {
    const invoice = list.find(
      (inv) => inv.invoiceId?.toString() === invoiceId || inv.id?.toString() === invoiceId
    );

    if (invoice) {
      setInvoiceData(invoice);
    } else {
      console.warn("⚠️ Invoice not found in list.");
    }
  }, [list, invoiceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const updatePayload = {
        invoiceId: invoiceData.invoiceId || invoiceData.id,
        updatedData: {
          invoiceNumber: invoiceData.invoiceNumber,
          clientName: invoiceData.clientName,
          status: invoiceData.status,
        },
      };
    
      await dispatch(updateInvoice(updatePayload)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("❌ Error updating invoice:", error);
      alert("Error updating invoice: " + error.message);
    }
  };
  

  const handleCancel = () => {
    if (window.confirm("Do you want to cancel editing?")) {
      navigate("/");
    }
  };

  if (!invoiceData) return <p>🔄 Loading invoice...</p>;

  return (
    <div className={styles.container}>
      <h2>Edit Invoice</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Invoice Number*</label>
        <input type="text" name="invoiceNumber" value={invoiceData.invoiceNumber || ""} onChange={handleChange} />
        {errors.invoiceNumber && <span className={styles.error}>{errors.invoiceNumber}</span>}

        <label>Client Name*</label>
        <input type="text" name="clientName" value={invoiceData.clientName || ""} onChange={handleChange} />
        {errors.clientName && <span className={styles.error}>{errors.clientName}</span>}

        <label>Status*</label>
        <select name="status" value={invoiceData.status || ""} onChange={handleChange}>
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
