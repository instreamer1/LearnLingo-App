import css from "./HomePage.module.css";
import photo from "../../assets/images/block.png";
import { NavLink } from "react-router-dom";
function HomePage() {
  console.log("HomePage is rendered");
  return (
    <>
      {" "}
      <section className={css.hero}>
        <div className={css.container}>
          <div className={css.heroSection}>
            <div className={css.startedWrapper}>
              <h1 className={css.homePageTitle}>
                Unlock your potential with the best
                <span className={css.homePageSpan}> language</span> tutors
              </h1>
              <p className={css.homePageDesc}>
                Embark on an Exciting Language Journey with Expert Language
                Tutors: Elevate your language proficiency to new heights by
                connecting with highly qualified and experienced tutors.
              </p>
              <div className={css.btnWrapper}>
                <NavLink to="/teachers" className={css.getStartedLink}>
                  Get Started
                </NavLink>
              </div>
            </div>
            <div className={css.visualWrapper}>
              <img
                src={photo}
                alt="teacherPhoto"
                className={css.teacherPhoto}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
