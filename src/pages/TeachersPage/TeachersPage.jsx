import { useDispatch, useSelector } from "react-redux";
import FilterSelector from "../../components/FilterSelector/FilterSelector";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeachersPage.module.css";
import { useEffect, useState } from "react";
import { getTeachers } from "../../redux/teacherSlice/operation";
import { selectError, selectLastKey, selectList, selectLoading } from "../../redux/teacherSlice/selectors";

const TeachersPage = () => {
  const loading = useSelector(selectLoading);
  const list = useSelector(selectList);
  const error = useSelector(selectError);
  const lastKey = useSelector(selectLastKey);
  const dispatch = useDispatch();

  const [pageSize] = useState(4);

  useEffect(() => {
    dispatch(getTeachers({ pageSize, lastKey: null }));
  }, [dispatch, pageSize]);
  // useEffect(() => {
  //   if (loading) {
  //     // Проверка, чтобы избежать повторных вызовов
  //     dispatch(getTeachers({ pageSize, lastKey: null }));
  //   }
  // }, [pageSize, loading]);

  const loadMore = () => {
    dispatch(getTeachers({ pageSize, lastKey }));
  };

  if (loading && list.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section>
        <div className={css.container}>
          <FilterSelector />
        </div>
      </section>
      <section className={css.teacher}>
        {/* <div className={css.container}>
          <TeacherCard />
        </div> */}
        <ul>
          {list.map((teacher) => (
            <li key={teacher.id} id={teacher.id}>
              <TeacherCard />
            </li>
          ))}
        </ul>
        {loading ? (
          <p>Loading more...</p>
        ) : (
          <button onClick={loadMore}>Load More</button>
        )}
      </section>
    </>
  );
};

export default TeachersPage;
