import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../../redux/invoiceSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import {
  FiCalendar,
  FiDollarSign,
  FiTag,
  FiMail,
  FiCreditCard,
  FiEdit,
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const Card = ({ invoice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    invoiceId,
    id,
    invoiceNumber,
    clientName,
    clientEmail,
    amount,
    currency,
    status,
    issueDate,
    dueDate,
    paymentDate,
    discount,
    tax,
    paymentMethod,
    category,
    tags,
    notes,
  } = invoice;

  const actualInvoiceId = invoiceId || id; 
  const handleDelete = async () => {
    if (!actualInvoiceId) {
      console.error("❌ Error: invoiceId is undefined!");
      alert("Error: Invoice ID is missing.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await dispatch(deleteInvoice(String(actualInvoiceId))).unwrap();
      } catch (error) {
        console.error("❌ Error deleting invoice:", error);
        alert("Error deleting invoice: " + error.message);
      }
    }
  };

  const handleEdit = () => {
    if (!actualInvoiceId) {
      console.error("❌ Error: invoiceId is undefined!");
      alert("Error: Invoice ID is missing.");
      return;
    }
    navigate(`/edit-invoice/${actualInvoiceId}`);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <FiClock />;
      case "paid":
        return <FiCheckCircle />;
      case "overdue":
        return <FiAlertCircle />;
      default:
        return <FiClock />;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.invoiceNumber}>Invoice: {invoiceNumber}</h3>

        <div className={styles.statusTagContainer}>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <span key={index} className={`${styles.tag} ${styles[`tag-${tag.toLowerCase()}`]}`}>
                  <FiTag /> {tag}
                </span>
              ))}
            </div>
          )}

          <span className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}>
            {getStatusIcon(status)} {status}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.column}>
          <h4>Client Information</h4>
          <p><strong>Name:</strong> {clientName}</p>
          <p><FiMail /> {clientEmail}</p>
          <p><FiCreditCard /> <strong>Payment Method:</strong> {paymentMethod}</p>
          <p><FiTag /> <strong>Category:</strong> {category}</p>
        </div>

        <div className={styles.column}>
          <h4>Payment Details</h4>
          <p><FiDollarSign /> <strong>Amount:</strong> {currency} {amount.toFixed(2)}</p>
          <p><strong>Discount:</strong> {currency} {discount.toFixed(2)}</p>
          <p><strong>Tax:</strong> {currency} {tax.toFixed(2)}</p>
        </div>

        <div className={styles.column}>
          <h4>Date Information</h4>
          <p><FiCalendar /> <strong>Issue Date:</strong> {new Date(issueDate).toLocaleDateString()}</p>
          <p><FiCalendar /> <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}</p>
          <p><FiCalendar /> <strong>Payment Date:</strong> {paymentDate ? new Date(paymentDate).toLocaleDateString() : "Not Paid"}</p>
        </div>
      </div>

      {notes && (
        <div className={styles.notes}>
          <strong>Notes:</strong>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.actions}>
        <button onClick={handleEdit} className={styles.editButton} aria-label="Edit Invoice">
          <FiEdit /> Edit
        </button>
        <button onClick={handleDelete} className={styles.deleteButton} aria-label="Delete Invoice">
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  invoice: PropTypes.shape({
    invoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    invoiceNumber: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    clientEmail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    issueDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    paymentDate: PropTypes.string,
    discount: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    notes: PropTypes.string,
  }).isRequired,
};

export default Card;
