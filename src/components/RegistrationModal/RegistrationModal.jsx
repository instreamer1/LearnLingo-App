import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Modal from "../Modal/Modal.jsx";
import Button from "../Button/Button.jsx";
import css from "./RegistrationModal.module.css";
import { createUser } from "../../auth-firebase/firebase.js";
import { startSession } from "../../auth-firebase/session.js";
import LogInModal from "../LogInModal/LogInModal.jsx";
import {
  checkEmailExists,
  saveUserProfile,
} from "../../auth-firebase/firestore.js";

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
    console.log("Registration data:", { name, email, password });

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      toast.error("Email is already in use. Please try logging in.");
      return;
    }
    try {
   
      const registerResponse = await createUser(email, password);

      // await saveUserProfile({
      //   uid: registerResponse.user.uid,
      //   name: name,
      //   email:email,
      // });
      await startSession(registerResponse.user);

      toast.success("User registered successfully!");
      closeModal();
      reset();
      // navigate("/user");
      // setLogInModalOpen(true);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error?.message || "An unknown error occurred! Please try again.";
      toast.error(errorMessage);
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
