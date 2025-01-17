import NewInvoiceButton from "../../components/Button/NewInvoiceButton/NewInvoiceButton";
import FilterButton from "../../components/Button/FilterButton/FilterButton";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import OrderByButton from "../../components/Button/OrderBy/OrderByButton";
import styles from "./Home.module.css";

const HomePage = () => (
  <main className={styles.container}>
    <div className={styles.actions}>
      <OrderByButton />
      <FilterButton />
      <NewInvoiceButton />
    </div>
    <InvoiceList />
  </main>
);

export default HomePage;
