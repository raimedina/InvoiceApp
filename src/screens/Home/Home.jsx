import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../../redux/invoiceSlice";
import NewInvoiceButton from "../../components/Button/NewInvoiceButton/NewInvoiceButton";
import FilterButton from "../../components/Button/FilterButton/FilterButton";
import OrderByButton from "../../components/Button/OrderBy/OrderByButton";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.invoice);
  const { filters, sortBy, sortDirection } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const searchTerm = filters?.invoiceNumber || ""; 

  const filteredInvoices = list.filter((invoice) =>
    Object.entries(invoice).every(([value]) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
  );

  filteredInvoices.sort((a, b) => {
    if (!a[sortBy] || !b[sortBy]) return 0;
  
    if (["amount", "tax"].includes(sortBy)) {
      return sortDirection === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else if (["issueDate", "dueDate"].includes(sortBy)) {
      return sortDirection === "asc"
        ? new Date(a[sortBy]) - new Date(b[sortBy])
        : new Date(b[sortBy]) - new Date(a[sortBy]);
    } else {
      return sortDirection === "asc"
        ? (a[sortBy] || "").localeCompare(b[sortBy] || "")
        : (b[sortBy] || "").localeCompare(a[sortBy] || "");
    }
  });

  return (
    <main className={styles.container}>
      <div className={styles.actions}>
        <OrderByButton />
        <FilterButton />
        <NewInvoiceButton />
      </div>

      {status === "loading" && <p className={styles.loading}>🔄 Loading invoices...</p>}
      {error && <p className={styles.error}>❌ Error loading invoices: {error}</p>}
      {status === "succeeded" && <InvoiceList invoices={filteredInvoices} />}
    </main>
  );
};

export default Home;
