import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import toast from "react-hot-toast";

import css from "./BookModal.module.css";
import Button from "../Button/Button";

const bookTrialSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  phone: yup
    .string()
    .required("Phone number is required!")
    .matches(
      /^\+[1-9]\d{1,14}$/,
      "Enter a valid phone number in international format (e.g., +1234567890)"
    ),
  reasonTopic: yup
    .string()
    .required("Please select a reason for learning English!"),
});

const BookModal = ({ modalIsOpen, closeModal, teacher }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookTrialSchema),
  });

  const { avatar_url, name, surname } = teacher;

  const onSubmit = async (data) => {
    try {
      toast.success("Trial lesson booked successfully!");
      closeModal();
      reset();
    } catch (error) {
      toast.error("Failed to book the lesson. Please try again.");
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal}>
      <div className={css.wrapper}>
        <div className={css.firstWrapper}>
          <h2 className={css.bookTitle}>Book trial lesson</h2>
          <p className={css.bookDesc}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
          <div className={css.infoWrapper}>
            <div>
              <img
                src={avatar_url}
                alt={`${name} ${surname}`}
                className={css.avatar}
              />
            </div>
            <div>
              <span className={css.bookSpan}>Your teacher</span>
              <h3 className={css.fullNameTitle}>{`${name} ${surname}`}</h3>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.formWrapper}>
          <h3 className={css.formTitle}>
            What is your main reason for learning English?
          </h3>
          <div className={css.radioWrapper}>
            {[
              "Career and business",
              "Lesson for kids",
              "Living abroad",
              "Exams and coursework",
              "Culture, travel or hobby",
            ].map((reason) => (
              <label key={reason} className={css.radioLabel}>
                <input
                  type="radio"
                  {...register("reasonTopic")}
                  value={reason}
                  className={css.radioInput}
                />
                <p className={css.reasonDesc}>{reason}</p>
              </label>
            ))}
            {errors.reasonTopic && (
              <p className={css.error}>{errors.reasonTopic.message}</p>
            )}
          </div>
          <div className={css.inputsWrapper}>
            <div className={css.inputWrapper}>
              <label>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className={css.bookInput}
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
                  className={css.bookInput}
                />
                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
              </label>
            </div>
            <div className={css.inputWrapper}>
              <label>
                <input
                  type="text"
                  placeholder="Phone number"
                  {...register("phone")}
                  className={css.bookInput}
                />
                {errors.phone && (
                  <p className={css.error}>{errors.phone.message}</p>
                )}
              </label>
            </div>
          </div>
          <div className={css.btnWrapper}>
            <Button type="submit" description="Book" variant="book" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookModal;
