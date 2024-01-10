import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSearchId, fetchData } from "../../store/dataSlice";
import logo from "../../img/logo.png";
import Filter from "../filter";
import ItemList from "../item-list/ItemList";
import Sorting from "../sorting/Sorting";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { searchId, allFetched, status } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      if (status !== 'loading' && !allFetched) {
        dispatch(fetchData(searchId));
      }
    }
  }, [searchId, allFetched, status, dispatch]);

  return (
    <>
      <img src={logo} alt="" className="logo" />
      <div className="content-wrap">
        <Filter />
        <div className="right-block">
          <Sorting />
          <ItemList />
        </div>
      </div>
    </>
  );
}

export default App;
