import { useSelector } from "react-redux";
import css from "./FilterSelector.module.css";
import {
  selectAllLanguages,
  selectAllLevels,
  selectAllPrices,
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
  const allLanguages = useSelector(selectAllLanguages);
  const allLevels = useSelector(selectAllLevels);
  const allPrices = useSelector(selectAllPrices);

  return (
    <div className={css.wrapper}>
      <div className={css.field}>
        <label className={css.label}>Languages</label>
        <select
          className={css.select}
          name="language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="" >
            Language
          </option>
          {allLanguages.map((languageOption, index) => (
            <option key={index} value={languageOption}>
              {languageOption}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label}>Level of knowledge</label>
        <select
          className={css.select}
          name="level"
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
        >
          <option value="" >
            Level
          </option>
          {allLevels.map((levelOption, index) => (
            <option key={index} value={levelOption}>
              {levelOption}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label}>Price</label>
        <select
          className={css.select}
          name="price"
          value={price || ""}
          onChange={(e) => onPriceChange(Number(e.target.value))}
        >
          <option value="" >
            Price
          </option>
          {allPrices.map((priceOption, index) => (
            <option key={index} value={priceOption}>
              {`${priceOption} $`}
            </option>
          ))}
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
