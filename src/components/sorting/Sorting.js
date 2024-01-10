import { useDispatch, useSelector } from 'react-redux';
import { selectSorting } from "../../store/sortingSlice";
import styles from "./Sorting.module.scss";
import { selectSortingParameter } from '../../store/selectors';

function Sorting() {
  const dispatch = useDispatch();
  const sorting = useSelector(selectSortingParameter);
  return (
    <div className={styles.tabsWrap}>
      <button
        type="button"
        className={sorting === 'cheapest' ? styles.active : ""}
        onClick={() => dispatch(selectSorting({ option: "cheapest" }))}
      >САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        type="button"
        className={sorting === 'fastest' ? styles.active : ""}
        onClick={() => dispatch(selectSorting({ option: "fastest" }))}
      >САМЫЙ БЫСТРЫЙ
      </button>
      <button
        type="button"
        className={sorting === 'optimal' ? styles.active : ""}
        onClick={() => dispatch(selectSorting({ option: "optimal" }))}
      >ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

export default Sorting;
