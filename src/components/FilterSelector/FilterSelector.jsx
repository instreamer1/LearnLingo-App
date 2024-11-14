import css from "./FilterSelector.module.css";

const FilterSelector = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.field}>
        <label className={css.label}>Languages</label>
        <select className={css.select}>
          <option value="french">English</option>
          <option value="english">French</option>
          <option value="spanish">Spanish</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className={css.field}>
        <label className={css.label}>Level of knowledge</label>
        <select className={css.select}>
          <option value="a1">A1 Beginner</option>
          <option value="a2">A2 Elementary</option>
          <option value="b1">B1 Intermediate</option>
          <option value="b2">B2 Upper Intermediate</option>
        </select>
      </div>
      <div className={css.field}>
        <label className={css.label}>Price</label>
        <select className={css.select}>
          <option value="30">$30</option>
          <option value="50">$50</option>
          <option value="100">$100</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
};

export default FilterSelector;
