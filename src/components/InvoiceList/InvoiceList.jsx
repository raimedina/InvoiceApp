import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadInvoices, loadMoreInvoices } from "../../redux/invoiceSlice";
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
      dispatch(loadInvoices());
    }
  }, [status, dispatch, invoices.length]);

  const filteredInvoices = invoices
    .filter((invoice) => {
      return (
        (filters.invoiceNumber === "" || invoice.invoiceNumber.includes(filters.invoiceNumber)) &&
        (filters.clientName === "" || invoice.clientName.toLowerCase().includes(filters.clientName.toLowerCase())) &&
        (filters.clientEmail === "" || invoice.clientEmail.toLowerCase().includes(filters.clientEmail.toLowerCase())) &&
        (filters.status === "" || invoice.status === filters.status) &&
        (filters.paymentMethod === "" || invoice.paymentMethod === filters.paymentMethod) &&
        (filters.category === "" || invoice.category === filters.category) &&
        (filters.tags === "" || invoice.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase())))
      );
    })
    .sort((a, b) => {
      if (["amount", "issueDate", "dueDate"].includes(sortBy)) {
        const aValue = sortBy === "amount" ? a[sortBy] : new Date(a[sortBy]);
        const bValue = sortBy === "amount" ? b[sortBy] : new Date(b[sortBy]);
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    });

  const handleLoadMore = () => {
    dispatch(loadMoreInvoices());
  };

  if (status === "loading") return <p>Loading invoices...</p>;
  if (status === "failed") return <p>Error loading invoices.</p>;

  return (
    <div>
      <div className={styles.invoiceList}>
        {filteredInvoices.slice(0, visibleInvoices).map((invoice) => (
          <Card key={invoice.invoiceId} invoice={invoice} />
        ))}
      </div>

      {filteredInvoices.length === 0 && <p>No invoices match the applied filters.</p>}

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