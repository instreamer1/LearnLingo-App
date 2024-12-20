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
  const language = useSelector(selectLanguage);
  const level = useSelector(selectLevel);
  const price = useSelector(selectPrice);
  const filtersLoading = useSelector(selectFiltersLoading);
  const [pageSize] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);



  useEffect(() => {
    dispatch(getTeachers({ pageSize, lastKey: null }));
    dispatch(fetchTeachers()); 
  }, [dispatch, pageSize]);


  const teachersToRender =
    language || level || price ? filteredTeachers : teachers;

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(getTeachers({ pageSize, lastKey: null }));
  };
  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
  };



  const handleLevelChange = (level) => {
    dispatch(setLevel(level));
  };

  const handlePriceChange = (price) => {
    dispatch(setPrice(price)); 
  };

  const loadMore = () => {
    setIsLoadingMore(true);
    dispatch(getTeachers({ pageSize, lastKey }));
    setIsLoadingMore(false);
  };

  return (
    <>
      <section className={css.filters}>
        <div className={css.container}>
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
    
          {error && <p>Error: {error}</p>}
          <ul className={css.teachersList}>
            {teachersLoading && teachers.length === 0 ? (
              <p>Loading...</p> 
            ) : filtersLoading && filteredTeachers.length === 0 ? (
              <p>Applying filters...</p> 
            ) : teachersToRender.length > 0 ? (
              teachersToRender.map((teacher) => (
                <li
                  key={teacher.id}
                  id={teacher.id}
                  className={css.teachersListItem}
                >
                  <TeacherCard teacher={teacher} />
                </li>
              ))
            ) : (
              <p>No teachers found</p> 
            )}
          </ul>

          {!( language || level || price) && (
          <>
            {teacherPage === pageSize && !isLoadingMore && (
              <button className={css.btn} onClick={loadMore}>
                Load More
              </button>
            )}
            {isLoadingMore && <p>Loading more...</p>}
          </>
        )}

        </div>
      </section>
    </>
  );
};

export default TeachersPage;
