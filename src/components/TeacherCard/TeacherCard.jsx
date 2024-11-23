import css from "./TeacherCard.module.css";
import avatar from "../../assets/images/image 4.png";
import iconSprite from "../../assets/sprite.svg";
import { useEffect, useState } from "react";
import BookModal from "../BookModal/BookModal";
import toast from "react-hot-toast";

import { selectIsLoggedIn, selectUid } from "../../redux/userSlice/selectors";
import { useSelector } from "react-redux";
import { toggleFavoriteTeacher } from "../../auth-firebase/firestore";

const TeacherCard = ({ teacher }) => {
  const uid = useSelector(selectUid);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
    is_online,
    id,
  } = teacher;

  const [isFavorite, setIsFavorite] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const userRef = uid ? doc(firestore, "users", uid) : null;
  // console.log("uid TeacherCard", uid);

  // Обработчик клика на "Добавить/Удалить из избранного"
const handleFavoriteClick = async () => {
  console.log("uid TeacherCard", uid);
  if (!isLoggedIn) {
    toast.error("Please log in to add teachers to favorites.");
    return;
  }

  try {
    await toggleFavoriteTeacher(uid, teacher, isFavorite);
    setIsFavorite(!isFavorite); // Обновить локальное состояние
  } catch (error) {
    console.log(error.message);
    toast.error("An error occurred while updating favorites.");
  }
};

  // useEffect(() => {
  //   if (userRef) {
  //     const unsubscribe = onSnapshot(userRef, (snapshot) => {
  //       const data = snapshot.data();
  //       if (data?.favorites) {
  //         setIsFavorite(data.favorites.some((fav) => fav.id === teacher.id));
  //       }
  //     });
  //     return unsubscribe; // Cleanup on unmount
  //   }
  // }, [userRef, teacher.id]);

  // const handleFavoriteClick = async (e) => {
  //   e.stopPropagation();
  //   console.log("Autentith?", isLoggedIn);
  //   if (!isLoggedIn) {
  //     toast.error("Please log in to add teachers to favorites.");
  //     return;
  //   }

  //   try {
  //     await updateDoc(userRef, {
  //       favorites: isFavorite
  //         ? arrayRemove({ id, name, surname, avatar_url })
  //         : arrayUnion({ id, name, surname, avatar_url }),
  //     });
  //     toast.success(
  //       isFavorite
  //         ? "Removed from favorites."
  //         : "Added to favorites."
  //     );
  //   } catch (error) {
  //     console.error("Error updating favorites:", error);
  //     toast.error("An error occurred while updating favorites.");
  //   }
  // };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const handleClickReadMore = () => {
  //   setShowReadMore((previous) => !previous);
  // };

  return (
    <div className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={css.avatarPhoto}
        />

        {is_online && (
          <svg className={css.onlineStatus}>
            <use href={`${iconSprite}#icon-online`}></use>
          </svg>
        )}
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
              // {`${css.favoriteButton} ${
              //   isFavorite ? css.iconHartFav : ""
              // }`}

              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                className={
                  isFavorite
                  //  && isLoggedIn
                    ? `${css.iconHartFav}`
                    : `${css.iconHart}`
                }
              >
                <use href={`${iconSprite}#icon-vector-hart`}></use>
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
        <button className={css.readMore} onClick={() => setShowReadMore((prev) => !prev)}>
          {showReadMore ? "Hide" : "Read more"}
        </button>

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
      <BookModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        teacher={teacher}
      />
    </div>
  );
};

export default TeacherCard;

// // Проверяем локальное хранилище при монтировании
// useEffect(() => {
//   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   setIsFavorite(favorites.includes(id));
// }, [id]);

// // Обработчик клика по сердцу
// const handleFavoriteClick = (e) => {
//   e.stopPropagation();

//   if (!isAuthenticated) {
//     toast.success(
//       "This functionality is available only to authorized users!"
//     );
//     return;
//   }

//   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   if (isFavorite) {
//     // Удаляем из избранного
//     const updatedFavorites = favorites.filter((favId) => favId !== id);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   } else {
//     // Добавляем в избранное
//     favorites.push(id);
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }

//   setIsFavorite((prev) => !prev);
// };
