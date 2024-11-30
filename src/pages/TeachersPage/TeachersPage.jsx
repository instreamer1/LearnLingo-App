import { useDispatch, useSelector } from "react-redux";
import FilterSelector from "../../components/FilterSelector/FilterSelector";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeachersPage.module.css";
import { useEffect, useState } from "react";
import { getTeachers } from "../../redux/teacherSlice/operations";
import {
  selectError,
  selectLastKey,
  selectTeachers,
  selectTeacherPage,
  selectTeachersLoading,
} from "../../redux/teacherSlice/selectors";
import {
  selectFilteredTeachers,
  selectFiltersLoading,
  selectLanguage,
  selectLevel,
  selectPrice,
} from "../../redux/filterSlice/selectors";
// import { getFilteredTeachers } from "../../redux/filterSlice/operations";
import {
  resetFilters,
  setLanguage,
  setLevel,
  setPrice,
} from "../../redux/filterSlice/slice";
import { fetchTeachers } from "../../redux/filterSlice/operations";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const teachersLoading = useSelector(selectTeachersLoading);
  const teachers = useSelector(selectTeachers);
  const error = useSelector(selectError);
  const lastKey = useSelector(selectLastKey);
  const teacherPage = useSelector(selectTeacherPage);
  const filteredTeachers = useSelector(selectFilteredTeachers);
  console.log("filteredTeachers", filteredTeachers);
  const language = useSelector(selectLanguage);
  const level = useSelector(selectLevel);
  const price = useSelector(selectPrice);
  const filtersLoading = useSelector(selectFiltersLoading);
  const [pageSize] = useState(4);
  // const teachers = useSelector(selectFilteredTeachers)

  // Первоначальная загрузка учителей
  useEffect(() => {
    // Загружаем всех учителей
    dispatch(getTeachers({ pageSize, lastKey: null }));
    dispatch(fetchTeachers()); // Загружаем в `filters` для фильтрации
  }, [dispatch, pageSize]);

  //   useEffect(() => {
  //   dispatch(getTeachers({ pageSize, lastKey: null }));
  // }, [dispatch, pageSize]);

  // Определяем, что рендерить
  const teachersToRender =
    language || level || price ? filteredTeachers : teachers;
  console.log(language || level || price);


  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(getTeachers({ pageSize, lastKey: null }));
  };
  const handleLanguageChange = (language) => {
    console.log("Selected language:", language);
    dispatch(setLanguage(language));
  };

  //

  const handleLevelChange = (level) => {
    dispatch(setLevel(level)); // Вызываем action setLevel
  };

  const handlePriceChange = (price) => {
    dispatch(setPrice(price)); // Вызываем action setPrice
  };

  const loadMore = () => {
    dispatch(getTeachers({ pageSize, lastKey }));
  };

  return (
    <>
      <section className={css.filters}>
        <div className={css.container}>
          {(teachersLoading || filtersLoading) && <p>Loading teachers...</p>}
          {error && <p>Error loading teachers: {error}</p>}
          <FilterSelector
            onLanguageChange={handleLanguageChange}
            onLevelChange={handleLevelChange}
            onPriceChange={handlePriceChange}
            onReset={handleResetFilters}
          />
        </div>
      </section>
      <section className={css.teacher}>
        <div className={css.container}>
          {/* {loading && teachers.length === 0 && <p>Loading...</p>}
          {error && <p>Error: {error}</p>} */}
          <ul className={css.teachersList}>
            {/* {teachers.map((teacher) => ( */}
            {
              // teachersLoading || filtersLoading ? (
              //   <p>Loading...</p>
              // ) :
              teachersToRender.length > 0 ? (
                teachersToRender.map((teacher) => (
                  <li
                    key={teacher.id}
                    id={teacher.id}
                    className={css.teachersListItem}
                  >
                    <TeacherCard teacher={teacher} />
                  </li>
                ))
              ) 
              : (
                <p>No teachers found</p>
              )
            }
          </ul>

          {!(language || level || price) &&
            (teachersLoading ? (
              <p>Loading more...</p>
            ) : (
              teacherPage === pageSize && (
                <button className={css.btn} onClick={loadMore}>
                  Load More
                </button>
              )
            ))}
        </div>
      </section>
    </>
  );
};

export default TeachersPage;
