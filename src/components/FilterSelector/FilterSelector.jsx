import { useDispatch, useSelector } from "react-redux";
import css from "./FilterSelector.module.css";
import {
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
import { getFilteredTeachers } from "../../redux/filterSlice/operations";

const FilterSelector = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const level = useSelector(selectLevel);
  const price = useSelector(selectPrice);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "language") {
      dispatch(setLanguage(value));
    } else if (name === "level") {
      dispatch(setLevel(value));
    } else if (name === "price") {
      dispatch(setPrice(value));
    }

    dispatch(getFilteredTeachers({ language, level, price, [name]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters()); 
    dispatch(getFilteredTeachers({})); 
  };

  return (
    <div className={css.wrapper}>
      <div className={css.field}>
        <label className={css.label}>Languages</label>
        <select className={css.select} name="language" onChange={handleChange}>
          {/* <option >change</option> */}
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className={css.field}>
        <label className={css.label}>Level of knowledge</label>
        <select className={css.select} name="level" onChange={handleChange}>
          <option value="a1">A1 Beginner</option>
          <option value="a2">A2 Elementary</option>
          <option value="b1">B1 Intermediate</option>
          <option value="b2">B2 Upper Intermediate</option>
          <option value="c1">C1 Advanced</option>
          <option value="c2">C2 Proficient</option>
        </select>
      </div>
      <div className={css.field}>
        <label className={css.label}>Price</label>
        <select className={css.select} name="price" onChange={handleChange}>
          <option value="25">25 $</option>
          <option value="30">30 $</option>
          <option value="35">35 $</option>
        </select>
      </div>
      {/* <button className={css.resetButton} onClick={handleReset}>
        Reset Filters
      </button> */}
    </div>
  );
};

export default FilterSelector;
