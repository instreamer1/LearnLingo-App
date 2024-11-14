import FilterSelector from "../../components/FilterSelector/FilterSelector";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeachersPage.module.css";

function TeachersPage() {
  return (
    <>
      <section>
      <div className={css.container}>
        <FilterSelector />
        </div>
      </section>
      <section className={css.teacher}>
        <div className={css.container}>
          <TeacherCard />
        </div>
      </section>
    </>
  );
}

export default TeachersPage;
