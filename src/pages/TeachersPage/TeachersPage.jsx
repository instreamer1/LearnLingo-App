import { useDispatch, useSelector } from "react-redux";
import FilterSelector from "../../components/FilterSelector/FilterSelector";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeachersPage.module.css";
import { useEffect, useState } from "react";
import { getTeachers } from "../../redux/teacherSlice/operations";
import {
  selectError,
  selectFilteredTeachers,
  selectLastKey,
  // selectList,
  selectLoading,
  selectTeacherPage,
} from "../../redux/teacherSlice/selectors";


const TeachersPage = () => {

  const dispatch = useDispatch();
  const loading= useSelector(selectLoading);
  // const teachers = useSelector(selectList);
  const error = useSelector(selectError);
  const lastKey = useSelector(selectLastKey);
  const teacherPage = useSelector(selectTeacherPage);
  const [pageSize] = useState(4);
  const teachers = useSelector(selectFilteredTeachers)

  console.log("teachers", teachers);
 



  useEffect(() => {
    dispatch(getTeachers({ pageSize, lastKey: null }));
  }, [dispatch, pageSize]);

  const loadMore = () => {
    dispatch(getTeachers({ pageSize, lastKey }));
  };


  return (
    <>
      <section className={css.filters}>
        <div className={css.container}>
        {loading && (<p>Loading teachers...</p>)}
        {error && (<p>Error loading teachers: {error}</p>)}
          <FilterSelector />
        </div>
      </section>
      <section className={css.teacher}>
        <div className={css.container}>
          {loading && teachers.length === 0 && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <ul className={css.teachersList}>
            {teachers.map((teacher) => (
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
