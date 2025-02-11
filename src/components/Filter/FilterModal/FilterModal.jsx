import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, toggleFilter } from "../../../redux/filterSlice";
import { FiX } from "react-icons/fi";
import styles from "./FilterModal.module.css";

const FilterModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.filter.isFilterOpen);
  
  const [localFilters, setLocalFilters] = useState({
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    status: "",
    paymentMethod: "",
    category: "",
    tags: [],
    amount: "",
  });

  // Log quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        invoiceNumber: "",
        clientName: "",
        clientEmail: "",
        status: "",
        paymentMethod: "",
        category: "",
        tags: [],
        amount: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, multiple, options, type } = e.target;
    let newValue = value;

    if (multiple) {
      newValue = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
    }

    if (type === "number") {
      newValue = value ? parseFloat(value) : "";
    }
    setLocalFilters((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleClear = () => {
    setLocalFilters({
      invoiceNumber: "",
      clientName: "",
      clientEmail: "",
      status: "",
      paymentMethod: "",
      category: "",
      tags: [],
      amount: "",
    });
  };

  const handleClose = useCallback(() => {
    dispatch(toggleFilter());
    handleClear();
  }, [dispatch]);
  const handleApply = () => {
    dispatch(setFilter({ field: "all", value: localFilters }));
    dispatch(toggleFilter()); // Fecha o modal após aplicar os filtros
  };
  

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      handleClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
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
            value={localFilters.invoiceNumber}
            onChange={handleInputChange}
            placeholder="Search by invoice number"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={localFilters.clientName}
            onChange={handleInputChange}
            placeholder="Search by client name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Client Email:</label>
          <input
            type="text"
            name="clientEmail"
            value={localFilters.clientEmail}
            onChange={handleInputChange}
            placeholder="Search by email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Status:</label>
          <select name="status" value={localFilters.status} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Payment Method:</label>
          <select name="paymentMethod" value={localFilters.paymentMethod} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Paypal">Paypal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Category:</label>
          <select name="category" value={localFilters.category} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Consulting">Consulting</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Tags:</label>
          <select name="tags" value={localFilters.tags} onChange={handleInputChange} multiple>
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
            value={localFilters.amount || ""}
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
