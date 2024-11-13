import css from "./HomePage.module.css";
import photo from "../../assets/images/block.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/teachers");
  };

  return (
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
            <div className={css.btnWrapper}></div>
            <button
              className={css.getStarted}
              type="button"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
          <div className={css.visualWrapper}>
            <img src={photo} alt="teacherPhoto" className={css.teacherPhoto} />
          </div>
        </div>
        <div className={css.tutorsInfo}>
          <div className={css.tutorsBlock}>
            <p className={css.firstText}>32,000 +</p>
            <p className={css.secondText}>Experienced tutors</p>
          </div>
          <div className={css.tutorsBlock}>
            <p className={css.firstText}>300,000 +</p>
            <p className={css.secondText}>5-star tutor reviews</p>
          </div>
          <div className={css.tutorsBlock}>
            <p className={css.firstText}>120 +</p>
            <p className={css.secondText}>Subjects taught</p>
          </div>
          <div className={css.tutorsBlock}>
            <span className={css.firstText}>200 +</span>
            <p className={css.secondText}>Tutor nationalities</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
