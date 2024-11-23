import { useDispatch, useSelector } from "react-redux";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritesPage.module.css";
import {
  selectError,
  selectFavorites,
  selectLoading,
} from "../../redux/favoritesSlice/selectors";
import { useEffect } from "react";
import { fetchFavorites } from "../../redux/favoritesSlice/operations";
import { selectIsLoggedIn, selectUid } from "../../redux/userSlice/selectors";

function FavoritesPage() {
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const uid = useSelector(selectUid);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn && uid) {
      dispatch(fetchFavorites(uid));
    }
  }, [dispatch, isLoggedIn, uid]);

  return (
    <section className={css.favorites}>
      <div className={css.container}>
        {loading && <p>Loading favorites...</p>}
        {error && <p>Error loading favorites: {error}. Log out and log in again.</p>}
        {!loading && favorites.length === 0 && !error && (
          <p>No favorite teachers found.</p>
        )}

        <ul className={css.teachersList}>
          {favorites.map((teacher) => (
            <li
              key={teacher.id}
              id={teacher.id}
              className={css.teachersListItem}
            >
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FavoritesPage;
