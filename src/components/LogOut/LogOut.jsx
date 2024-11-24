import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import css from "./LogOut.module.css";
import iconSprite from "../../assets/sprite.svg";


import { logout } from "../../redux/userSlice/slice";
import { endSession } from "../../auth-firebase/session";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleClickLogout = () => {
    dispatch(logout());
    endSession();
    navigate("/teachers"); 
  };
  return (
    <div>
      <button type="button" className={css.btn} onClick={handleClickLogout}>
        <svg className={css.iconLogin} width={20} height={20}>
          <use href={`${iconSprite}#icon-login`}></use>
        </svg>
      </button>
    </div>
  );
};

export default LogOut;
