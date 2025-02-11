import { useNavigate } from "react-router-dom";
import styles from "./NewInvoiceButton.module.css";
import { FiPlus } from "react-icons/fi";

const NewInvoiceButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/new-invoice"); 
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleClick}
        className={styles.button}
        aria-label="Criar nova fatura"
      >
        <FiPlus className={styles.icon} />
        New Invoice
      </button>
    </div>
  );
};

export default NewInvoiceButton;
