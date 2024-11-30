import { useSelector } from "react-redux";
import css from "./FilterSelector.module.css";
import {
  selectLanguage,
  selectLevel,
  selectPrice,
} from "../../redux/filterSlice/selectors";

const FilterSelector = ({
  onLanguageChange,
  onLevelChange,
  onPriceChange,
  onReset,
}) => {
  const language = useSelector(selectLanguage);
  const level = useSelector(selectLevel);
  const price = useSelector(selectPrice);

  return (
    <div className={css.wrapper}>
      <div className={css.field}>
        <label className={css.label}>Languages</label>
        <select
          className={css.select}
          name="language"
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="">English</option>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
      
        </select>
      </div>
      <div className={css.field}>
        <label className={css.label}>Level of knowledge</label>
        <select
          className={css.select}
          name="level"
          onChange={(e) => onLevelChange(e.target.value)}
        >
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
        <select
          className={css.select}
          name="price"
          onChange={(e) => onPriceChange(Number(e.target.value))}
        >
          <option value="25">25 $</option>
          <option value="30">30 $</option>
          <option value="35">35 $</option>
        </select>
      </div>
      <div className={css.field}>
        {(language || level || price) && (
          <button className={css.resetButton} onClick={onReset}>
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSelector;
