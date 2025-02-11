import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices, loadMoreInvoices } from "../../redux/invoiceSlice";
import { FiChevronDown } from "react-icons/fi";
import Card from "../Card/Card";
import styles from "./InvoiceList.module.css";

const InvoiceList = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoice.list);
  const status = useSelector((state) => state.invoice.status);
  const filters = useSelector((state) => state.filter.filters);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortDirection = useSelector((state) => state.filter.sortDirection);
  const visibleInvoices = useSelector((state) => state.invoice.visibleInvoices);

  useEffect(() => {
    if (status === "idle" || invoices.length === 0) {
      dispatch(fetchInvoices());
    }
  }, [status, dispatch, invoices.length]);

  const filteredInvoices = invoices
    .filter((invoice) => {
      if (filters.clientName && !invoice.clientName?.toLowerCase().includes(filters.clientName.toLowerCase())) {
        return false;
      }

      if (filters.invoiceNumber && !invoice.invoiceNumber?.includes(filters.invoiceNumber)) {
        return false;
      }

      if (filters.clientEmail && !invoice.clientEmail?.toLowerCase().includes(filters.clientEmail.toLowerCase())) {
        return false;
      }

      if (filters.status && invoice.status !== filters.status) {
        return false;
      }

      if (filters.paymentMethod && invoice.paymentMethod !== filters.paymentMethod) {
        return false;
      }

      if (filters.category && invoice.category !== filters.category) {
        return false;
      }

      if (filters.tags.length > 0 && !invoice.tags?.some(tag => filters.tags.includes(tag))) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (!a[sortBy] || !b[sortBy]) return 0;

      if (["amount", "issueDate", "dueDate"].includes(sortBy)) {
        return sortDirection === "asc"
          ? new Date(a[sortBy]) - new Date(b[sortBy])
          : new Date(b[sortBy]) - new Date(a[sortBy]);
      }

      return sortDirection === "asc"
        ? (a[sortBy] || "").localeCompare(b[sortBy] || "")
        : (b[sortBy] || "").localeCompare(a[sortBy] || "");
    });

  const handleLoadMore = () => {
    dispatch(loadMoreInvoices());
  };

  if (status === "loading") return <p>🔄 Loading invoices...</p>;
  if (status === "failed") return <p>❌ Error loading invoices.</p>;

  return (
    <div>
      <div className={styles.invoiceList}>
        {filteredInvoices.length > 0 ? (
          filteredInvoices.slice(0, visibleInvoices).map((invoice) => (
            <Card key={invoice.invoiceId || invoice.id} invoice={invoice} />
          ))
        ) : (
          <p>⚠️ No invoices found. Check filters or data.</p>
        )}
      </div>

      {visibleInvoices < filteredInvoices.length && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            See More Invoices <FiChevronDown className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
