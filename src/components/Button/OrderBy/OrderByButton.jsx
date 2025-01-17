import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { setSortBy, toggleSortDirection } from "../../../redux/filterSlice";
import styles from "./OrderByButton.module.css";

const OrderByButton = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortDirection = useSelector((state) => state.filter.sortDirection);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!sortBy) {
      dispatch(setSortBy("clientName"));
    }
  }, [dispatch, sortBy]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOrder = (order) => {
    dispatch(setSortBy(order));
    setIsDropdownOpen(false);
  };

  const handleToggleDirection = (e) => {
    e.stopPropagation();
    dispatch(toggleSortDirection());
  };

  const getOrderLabel = () => {
    switch (sortBy) {
      case "amount":
        return "Amount";
      case "issueDate":
        return "Issue Date";
      case "dueDate":
        return "Due Date";
      case "clientName":
      default:
        return "Client Name (A-Z)";
    }
  };

  return (
    <div className={styles.orderByContainer}>
      <button onClick={handleToggleDropdown} className={styles.orderByButton}>
        <span>Order By: {getOrderLabel()}</span>
        <FiChevronDown className={styles.dropdownIcon} />
      </button>

      <button onClick={handleToggleDirection} className={styles.sortDirectionButton} aria-label="Toggle Sort Direction">
        {sortDirection === "asc" ? (
          <FiArrowUp className={styles.sortIcon} />
        ) : (
          <FiArrowDown className={styles.sortIcon} />
        )}
      </button>

      {isDropdownOpen && (
        <ul className={styles.dropdown}>
          <li onClick={() => handleSelectOrder("clientName")}>Client Name (A-Z)</li>
          <li onClick={() => handleSelectOrder("amount")}>Amount</li>
          <li onClick={() => handleSelectOrder("issueDate")}>Issue Date</li>
          <li onClick={() => handleSelectOrder("dueDate")}>Due Date</li>
        </ul>
      )}
    </div>
  );
};

export default OrderByButton;
