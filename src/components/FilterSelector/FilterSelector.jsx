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
          <option value="c1">C1 Advanced</option>
          <option value="c2">C2 Proficient</option>
        </select>
      </div>
      <div className={css.field}>
        {/* <label className={css.label} htmlFor="priceInput">
          Price
        </label>
        <input
          className={css.select}
          id="priceInput"
          type="number"
          list="priceOptions"
          placeholder="Enter price"
        />
        <datalist id="priceOptions">
          <option value="20" />
          <option value="30" />
          <option value="50" />
     
        </datalist> */}
        <label className={css.label}>Price</label>
        <select className={css.select}>
          <option value="25">25 $</option>
          <option value="30">30 $</option>
          <option value="35">35 $</option>
      
        </select>
      </div>
    </div>
  );
};

export default FilterSelector;
