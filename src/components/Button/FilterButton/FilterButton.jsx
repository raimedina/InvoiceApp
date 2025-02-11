import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../../../redux/filterSlice";
import { FiSliders } from "react-icons/fi";

import FilterModal from "../../Filter/FilterModal/FilterModal";
import styles from "./FilterButton.module.css";

const FilterButton = () => {
  const dispatch = useDispatch();
  const isFilterOpen = useSelector((state) => state.filter.isFilterOpen);

  const handleToggle = () => {
    dispatch(toggleFilter());
  };
  

  return (
    <div className={styles.actionsContainer}>
      <button onClick={handleToggle} className={styles.filterButton}>
        Filter
        <FiSliders className={styles.icon} />
      </button>

      {isFilterOpen && (
        <div className={styles.modalContainer}>
          <FilterModal />
        </div>
      )}
    </div>
  );
};

export default FilterButton;
