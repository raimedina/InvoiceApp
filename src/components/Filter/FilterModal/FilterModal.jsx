import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilters, toggleFilter } from "../../../redux/filterSlice";
import { FiX } from "react-icons/fi";
import styles from "./FilterModal.module.css";

const FilterModal = () => {
  const dispatch = useDispatch();
  const isFilterOpen = useSelector((state) => state.filter.isFilterOpen);
  const filters = useSelector((state) => state.filter.filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ field: name, value }));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  const handleClose = useCallback(() => {
    dispatch(clearFilters());
    dispatch(toggleFilter());
  }, [dispatch]);

  const handleApply = () => {
    dispatch(toggleFilter());
  };

  useEffect(() => {
    if (isFilterOpen) {
      dispatch(clearFilters());
    }
  }, [isFilterOpen, dispatch]);

  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={handleClose} className={styles.closeButton} aria-label="Close filter modal">
          <FiX />
        </button>

        <h2>Filter Invoices</h2>

        <div className={styles.inputGroup}>
          <label>Invoice Number:</label>
          <input
            type="text"
            name="invoiceNumber"
            value={filters.invoiceNumber}
            onChange={handleInputChange}
            placeholder="Search by invoice number"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={filters.clientName}
            onChange={handleInputChange}
            placeholder="Search by client name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Client Email:</label>
          <input
            type="text"
            name="clientEmail"
            value={filters.clientEmail}
            onChange={handleInputChange}
            placeholder="Search by email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Status:</label>
          <select name="status" value={filters.status} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Payment Method:</label>
          <select name="paymentMethod" value={filters.paymentMethod} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Paypal">Paypal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Category:</label>
          <select name="category" value={filters.category} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Consulting">Consulting</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Tags:</label>
          <select
            name="tags"
            value={filters.tags}
            onChange={handleInputChange}
            multiple
          >
            <option value="Urgent">Urgent</option>
            <option value="Recurring">Recurring</option>
            <option value="Delayed">Delayed</option>
            <option value="Discount">Discount</option>
            <option value="Priority">Priority</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={filters.amount || ""}
            onChange={handleInputChange}
            placeholder="Search by amount"
          />
        </div>

        <div className={styles.actions}>
          <button onClick={handleClear} className={styles.clearBtn}>Clear</button>
          <button onClick={handleApply} className={styles.applyBtn}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
