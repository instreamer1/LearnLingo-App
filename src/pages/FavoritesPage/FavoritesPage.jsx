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
import { getAuth } from "firebase/auth";
import { selectIsLoggedIn, selectUid } from "../../redux/userSlice/selectors";

function FavoritesPage() {
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  // const auth = getAuth();
  // const user = auth.currentUser;
  const uid = useSelector(selectUid);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavorites(uid));
    }
  }, [dispatch, isLoggedIn, uid]);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites: {error}</p>;

  return (
    <section className={css.favorites}>
      <div className={css.container}>
        <ul className={css.teachersList}>
          {favorites.length > 0 ? (
            favorites.map((teacher) => (
              <li
                key={teacher.id}
                id={teacher.id}
                className={css.teachersListItem}
              >
                <TeacherCard
                 key={teacher.id} teacher={teacher}
                />
              </li>
            ))
          ) : (
            <p>No favorite teachers found.</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default FavoritesPage;
