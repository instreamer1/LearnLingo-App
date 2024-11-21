import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Modal from "../Modal/Modal.jsx";
import Button from "../Button/Button.jsx";
import css from "./RegistrationModal.module.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/userSlice/operation.js";

const registrationSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters!")
    .required("Password is required!"),
});

const RegistrationModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      toast.success("User registered successfully!");
      reset();
      closeModal();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal}>
      <div className={css.wrapper}>
        <h2 className={css.registerTitle}>Registration</h2>
        <p className={css.registerDesc}>
          Thank you for your interest in our platform! Please provide us with
          the following information to register:
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputsWrapper}>
            <div className={css.inputWrapper}>
              <label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className={css.registerInput}
                />
                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}
              </label>
            </div>

            <div className={css.inputWrapper}>
              <label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={css.registerInput}
                />
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
              </label>
            </div>

            <div className={css.inputWrapper}>
              <div className={css.passwordWrapper}>
                <label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    className={css.registerInput}
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

          <div className={css.btnWrapper}>
            <Button description="Sign up" variant="modal" type="submit" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegistrationModal;
