import { useDispatch, useSelector } from "react-redux";
import FilterSelector from "../../components/FilterSelector/FilterSelector";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeachersPage.module.css";
import { useEffect, useState } from "react";
import { getTeachers } from "../../redux/teacherSlice/operations";
import {
  selectError,
  selectLastKey,
  selectList,
  selectLoading,
  selectTeacherPage,
} from "../../redux/teacherSlice/selectors";

const TeachersPage = () => {
  const loading = useSelector(selectLoading);
  const list = useSelector(selectList);
  const error = useSelector(selectError);
  const lastKey = useSelector(selectLastKey);
  const teacherPage = useSelector(selectTeacherPage);
  const dispatch = useDispatch();

  const [pageSize] = useState(4);

  useEffect(() => {
    dispatch(getTeachers({ pageSize, lastKey: null }));
  }, [dispatch, pageSize]);

  const loadMore = () => {
    dispatch(getTeachers({ pageSize, lastKey }));
  };

  if (loading && list.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className={css.filters}>
        <div className={css.container}>
          <FilterSelector />
        </div>
      </section>
      <section className={css.teacher}>
        <div className={css.container}>
          {loading && list.length === 0 && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <ul className={css.teachersList}>
            {list.map((teacher) => (
              <li
                key={teacher.id}
                id={teacher.id}
                className={css.teachersListItem}
              >
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
          {loading ? (
            <p>Loading more...</p>
          ) : (
            teacherPage === pageSize && (
              <button className={css.btn} onClick={loadMore}>
                Load More
              </button>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default TeachersPage;
