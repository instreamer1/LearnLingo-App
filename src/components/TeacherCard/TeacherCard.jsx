import css from "./TeacherCard.module.css";
import avatar from "../../assets/images/image 4.png";
import iconSprite from "../../assets/sprite.svg";
import { useState } from "react";
import BookModal from "../BookModal/BookModal";

const TeacherCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }


  const handleClickReadMore = () => {
    setShowReadMore((previous) => !previous);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
    } else {
    }
  };
  return (
    <div className={css.card}>
      <div className={css.avatarWrapper}>
        <img src={avatar} alt="Jane Smith" className={css.avatarPhoto} />

        <svg className={css.onlineStatus}>
          <use href={`${iconSprite}#icon-online`}></use>
        </svg>
      </div>
      <div className={css.cardBody}>
        <div className={css.cardWrapper}>
          <div className={css.cardHeader}>
            <p className={css.languages}>Languages</p>
            <h2 className={css.name}>Jane Smith</h2>
          </div>
          <div className={css.cardLessonWrapper}>
            {/* <ul className={css.cardLesson}>
              <li>
                <svg className={css.iconBook}>
                  <use href={`${iconSprite}#icon-book`}></use>
                </svg>{" "}
                Lessons online
              </li>
              <li> | Lessons done: 1098</li>
              <li>
                <svg className={css.iconStar}>
                  <use href={`${iconSprite}#icon-star`}></use>
                </svg>
                Rating: 4.8
              </li>
              <li>| Price / 1 hour: $30</li>
            </ul> */}
            <ul className={css.cardLesson}>
              <li className={`${css.cardItem} ${css.withLine}`}>
                <svg className={css.iconBook}>
                  <use href={`${iconSprite}#icon-book`}></use>
                </svg>
                Lessons online
              </li>
              <li className={`${css.cardItem} ${css.withLine}`}>
                Lessons done: 1098
              </li>
              <li className={`${css.cardItem} ${css.withLine}`}>
                <svg className={css.iconStar}>
                  <use href={`${iconSprite}#icon-star`}></use>
                </svg>
                Rating: 4.8
              </li>
              <li className={css.cardItem}>
                Price / 1 hour: $30
              </li>
            </ul>

            <button
              className={css.favoriteButton}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? " removeFavorite" : "addFavorite"}
            >
              <svg
                className={`${css.iconHart} ${
                  isFavorite ? css.iconHartFav : ""
                }`}
              >
                <use href={`${iconSprite}#icon-hart`}></use>
              </svg>
            </button>
          </div>
        </div>
        <p className={css.speaks}>
          Speaks: <span>German, French</span>
        </p>
        <p className={css.lessonInfo}>
          Lesson Info: <span>Lessons are structured to cover grammar, vocabulary, and
          practical usage of the language.</span>
        </p>
        <p className={css.conditions}>
          Conditions: <span>Welcomes both adult learners and teenagers (13 years and
          above). Provides personalized study plans.</span>
        </p>
        {!showReadMore && (
          <button
            className={css.readMore}
            type="button"
            onClick={handleClickReadMore}
          >
            Read more
          </button>
        )}
        {/* <a href="#" className={css.readMore}>
          Read more
        </a> */}
        {showReadMore && (
          <div className={css.aboutTeacher}>
            <p className={css.aboutTeacherText}>
              Jane is an experienced and dedicated language teacher specializing
              in German and French. She holds a Bachelor's degree in German
              Studies and a Master's degree in French Literature. Her passion
              for languages and teaching has driven her to become a highly
              proficient and knowledgeable instructor. With over 10 years of
              teaching experience, Jane has helped numerous students of various
              backgrounds and proficiency levels achieve their language learning
              goals. She is skilled at adapting her teaching methods to suit the
              needs and learning styles of her students, ensuring that they feel
              supported and motivated throughout their language journey.
            </p>
            <ul className={css.reviewsList}>
              <li className={css.reviewsListItem}>
                <div className={css.reviewsWrapper}>
                  <img
                    src={avatar}
                    alt="User avatar"
                    className={css.reviewsPhoto}
                  />
                  <div className={css.reviewsUser}>
                    <p className={css.reviewsUserName}>Frank</p>
                    <div className={css.reviewsUserStars}>
                      <svg className={css.iconReviewsStar}>
                        <use href={`${iconSprite}#icon-star`}></use>
                      </svg>
                      <p className={css.reviewsUserRating}>4.8</p>
                    </div>
                  </div>
                </div>
                <p className={css.reviewsUserFeedback}>
                  Jane's lessons were very helpful. I made good progress.
                </p>
              </li>
            </ul>
          </div>
        )}
        <ul className={css.tags}>
          <li className={css.tag}>#A1 Beginner</li>
          <li className={css.tag}>#A2 Elementary</li>
          <li className={css.tag}>#B1 Intermediate</li>
          <li className={css.tag}>#B2 Upper-Intermediate</li>
          <li className={css.tag}>#C1 Advanced</li>
          <li className={css.tag}>#C2 Proficient</li>
        </ul>

        {showReadMore && (<button className={css.bookTrial} type="button" onClick={()=>openModal()}>Book trial lesson</button>)}
      </div>
      <BookModal modalIsOpen={modalIsOpen} closeModal={closeModal}/>
    </div>
  );
};

export default TeacherCard;
