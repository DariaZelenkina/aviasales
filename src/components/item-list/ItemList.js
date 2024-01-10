import { useSelector, useDispatch } from "react-redux";
import { uniqueId } from 'lodash';
import { loadMore } from "../../store/dataSlice";
import styles from "./ItemList.module.scss";
import Item from "../item/Item";
import { selectSortedData, selectIndex, selectAllFetched, selectError, selectAllDisplayed } from "../../store/selectors";

function ItemList() {
  const dispatch = useDispatch();
  const data = useSelector(selectSortedData);
  const allFetched = useSelector(selectAllFetched);
  const allDisplayed = useSelector(selectAllDisplayed);
  const error = useSelector(selectError);
  const index = useSelector(selectIndex);

  if (data.length === 0 && allFetched && !error) {
    return <h2>Рейсов, подходящих под заданные фильтры, не найдено</h2>;
  }

  let dataToDisplay = data.slice(0, index);
  dataToDisplay = dataToDisplay.map((item) => ({ ...item, id: uniqueId() }));
  const items = dataToDisplay.map((item) => (
    <Item key={item.id} {...item} />
  ));
  return (
    <>
      <ul className={styles.tickets}>{items}</ul>
      {error && <h2>An error occured: {error}</h2>}
      {data.length !== 0 && (
      <button
        type="button"
        className={styles.moreBtn}
        disabled={allDisplayed}
        onClick={() => dispatch(loadMore())}
      >
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
      )}
      {!allFetched && <h2>Loading...</h2>}
    </>
  );
}
export default ItemList;
