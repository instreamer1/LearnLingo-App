import css from "./LogOut.module.css";
import iconSprite from "../../assets/sprite.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authFireBase/operation";

const LogOut = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout);
  };

  return (
    <div>
      <button type="button" className={css.btn} onClick={handleClick}>
        <svg className={css.iconLogin} width={20} height={20}
        >
          <use href={`${iconSprite}#icon-login`}></use>
        </svg>
      </button>
    </div>
  );
};

export default LogOut;
