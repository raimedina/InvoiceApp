import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openInvoice, resetUI } from "../../../redux/uiSlice";
import styles from "./NewInvoiceButton.module.css";
import { FiPlus } from "react-icons/fi";

const NewInvoiceButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCreating = useSelector((state) => state.ui.isCreating);

  const handleClick = () => {
    if (!isCreating) {
      dispatch(openInvoice());
      navigate("/new-invoice");
    }
  };

  useEffect(() => {
    dispatch(resetUI()); 
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleClick}
        className={styles.button}
        aria-label="Criar nova fatura"
        disabled={isCreating}
      >
        <FiPlus className={styles.icon} />
        {isCreating ? "Loading..." : "New Invoice"}
      </button>
    </div>
  );
};

export default NewInvoiceButton;
