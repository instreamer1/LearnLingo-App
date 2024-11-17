import ReactModal from "react-modal";
import css from "./Modal.module.css";
import { IoCloseSharp } from "react-icons/io5";



const Modal = ({ isOpen, onClose, children })=>{
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className={css.modal}
      ariaHideApp={false}
      overlayClassName={css.overlay}
    >
      <div className={css.closeIcon} onClick={() => onClose()}>
        <IoCloseSharp size={32} />
      </div>
      {children}
    </ReactModal>
  );
}

export default Modal