/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFilter, selectTransfersFilter } from '../../store/filterSlice';
import styles from "./Filter.module.scss";
import { selectFilters } from '../../store/selectors';

function Filter() {
  const dispatch = useDispatch();
  const { all, transfers } = useSelector(selectFilters);
  return (
    <div className={styles.filterWrap}>
      <span>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <div className={styles.cbxWrap}>
        <label>
          <input type="checkbox" checked={all} onChange={() => dispatch(selectAllFilter())} />
          Все
        </label>
        <label>
          <input
            type="checkbox"
            checked={transfers.noTransfers}
            onChange={() => dispatch(selectTransfersFilter({ filter: 'noTransfers' }))}
          />
          Без пересадок
        </label>
        <label>
          <input
            type="checkbox"
            checked={transfers.oneTransfer}
            onChange={() => dispatch(selectTransfersFilter({ filter: 'oneTransfer' }))}
          />
          1 пересадка
        </label>
        <label>
          <input
            type="checkbox"
            checked={transfers.twoTransfers}
            onChange={() => dispatch(selectTransfersFilter({ filter: 'twoTransfers' }))}
          />
          2 пересадки
        </label>
        <label>
          <input
            type="checkbox"
            checked={transfers.threeTransfers}
            onChange={() => dispatch(selectTransfersFilter({ filter: 'threeTransfers' }))}
          />
          3 пересадки
        </label>
      </div>
    </div>
  );
}

export default Filter;
