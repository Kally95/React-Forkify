import Modal from "./Modal";
import { GoSmiley } from "react-icons/go";
import classes from "./SuccessModal.module.css";
import { useModal } from "../../contexts/ModalContextProvider";
export default function SuccessModal() {
  const { closeModal } = useModal();
  return (
    <Modal name="success">
      <div className={classes["success-modal-container"]}>
        <h1>Recipe Successfully Created </h1>
        <GoSmiley size={32} />
      </div>
      <div className={classes["success-modal-buttons-container"]}>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  );
}
