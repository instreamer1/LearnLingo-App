import css from "./TeacherCard.module.css";
import avatar from "../../assets/images/image 4.png";
import iconSprite from "../../assets/sprite.svg";
import { useState } from "react";
import BookModal from "../BookModal/BookModal";

const TeacherCard = ({ teacher }) => {
  const {
    avatar_url,
    name,
    surname,
    lessons_done,
    rating,
    price_per_hour,
    languages,
    lesson_info,
    conditions,
    experience,
    levels,
    reviews,
  } = teacher;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={css.avatarPhoto}
        />

        <svg className={css.onlineStatus}>
          <use href={`${iconSprite}#icon-online`}></use>
        </svg>
      </div>
      <div className={css.cardBody}>
        <div className={css.cardWrapper}>
          <div className={css.cardHeader}>
            <p className={css.languages}>Languages</p>
            <h2 className={css.name}>{`${name} ${surname}`}</h2>
          </div>
          <div className={css.cardLessonWrapper}>
            <ul className={css.cardLesson}>
              <li className={`${css.cardItem} ${css.withLine}`}>
                <svg className={css.iconBook}>
                  <use href={`${iconSprite}#icon-book`}></use>
                </svg>
                Lessons online
              </li>
              <li className={`${css.cardItem} ${css.withLine}`}>
                {`Lessons done: ${lessons_done}`}
              </li>
              <li className={`${css.cardItem} ${css.withLine}`}>
                <svg className={css.iconStar}>
                  <use href={`${iconSprite}#icon-star`}></use>
                </svg>
                {` Rating: ${rating}`}
              </li>
              <li
                className={css.cardItem}
              >{`Price / 1 hour: ${price_per_hour}`}</li>
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
          Speaks:
          {languages.length > 0 ? (
            languages.map((language) => (
              <span key={language} className={css.language}>
                {" "}
                {language}
              </span>
            ))
          ) : (
            <span>No languages specified</span>
          )}
        </p>
        <p className={css.lessonInfo}>
          Lesson Info: <span>{lesson_info}</span>
        </p>
        <p className={css.conditions}>
          Conditions:{" "}
          {conditions.length > 0 ? (
            conditions.map((condition, index) => (
              <span key={index}> {condition}</span>
            ))
          ) : (
            <span>No conditions specified</span>
          )}
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

        {showReadMore && (
          <div className={css.aboutTeacher}>
            <p className={css.aboutTeacherText}>{experience}</p>
            <ul className={css.reviewsList}>
              {reviews.length > 0 &&
                reviews.map(
                  ({ comment, reviewer_name, reviewer_rating }, index) => (
                    <li key={index} className={css.reviewsListItem}>
                      <div className={css.reviewsWrapper}>
                        <img
                          src={avatar}
                          alt="User avatar"
                          className={css.reviewsPhoto}
                        />
                        <div className={css.reviewsUser}>
                          <p className={css.reviewsUserName}>{reviewer_name}</p>
                          <div className={css.reviewsUserStars}>
                            <svg className={css.iconReviewsStar}>
                              <use href={`${iconSprite}#icon-star`}></use>
                            </svg>
                            <p className={css.reviewsUserRating}>
                              {reviewer_rating}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className={css.reviewsUserFeedback}>{comment}</p>
                    </li>
                  )
                )}
            </ul>
          </div>
        )}
        <ul className={css.tags}>
          {levels.length > 0 &&
            levels.map((level, index) => (
              <li key={index} className={css.tag}>
                {level}
              </li>
            ))}
        </ul>

        {showReadMore && (
          <button
            className={css.bookTrial}
            type="button"
            onClick={() => openModal()}
          >
            Book trial lesson
          </button>
        )}
      </div>
      <BookModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default TeacherCard;
