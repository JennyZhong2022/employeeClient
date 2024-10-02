import Modal from "react-modal";
import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.confirmModal}
      overlayClassName={styles.confirmModalOverlay}
      ariaHideApp={false} // Required to avoid accessibility warnings
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <div className={styles.confirmModalActions}>
        <button onClick={onRequestClose} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={onConfirm} className={styles.confirmBtn}>
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
