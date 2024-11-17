import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../Button/Button.jsx";
import css from "./LogInModal.module.css";

// Схема валидации с использованием Yup
const logInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters!")
    .required("Password is required!"),
});

const LogInModal = ({ modalIsOpen, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Хук для управления формой с валидацией через yup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
  });

  // Обработчик отправки формы
  const onSubmit = async (data) => {
    try {
      // Здесь предполагается вызов функции логина (например, через Redux)
      // await dispatch(logInUser({ email: data.email, password: data.password })).unwrap();
      toast.success("Logged in successfully!");
      closeModal(); // Закрыть модальное окно
      reset(); // Сбросить значения формы
    } catch (error) {
      toast.error("The user does not exist or your password is incorrect!");
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal}>
      <div className={css.wrapper}>
        <h2 className={css.logInTitle}>Log In</h2>
        <p className={css.logInDesc}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a teacher.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputsWrapper}>
            {/* Поле для email */}
            <div className={css.inputWrapper}>
              <label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={css.logInInput}
                />
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
              </label>
            </div>
            {/* Поле для пароля */}
            <div className={css.inputWrapper}>
              <div className={css.passwordWrapper}>
                <label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    className={css.logInInput}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={css.eyeButton}
                >
                  {showPassword ? (
                    <FiEyeOff className={css.eyeIcon} />
                  ) : (
                    <FiEye className={css.eyeIcon} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={css.error}>{errors.password.message}</p>
              )}
            </div>
          </div>
          {/* Кнопка логина */}
          <div className={css.btnWrapper}>
            <Button description="Log in" variant="modal" type="submit" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LogInModal;
