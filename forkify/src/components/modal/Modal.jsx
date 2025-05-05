import { useModal } from "../../contexts/ModalContextProvider";
import classes from "./Modal.module.css";

export default function Modal({ name, children }) {
  const { modal } = useModal();
  const isOpen = modal === name;

  if (!isOpen) return null;

  return (
    <div className={classes["modal-container"]}>
      <div className={classes["modal"]}>{children}</div>
    </div>
  );
}
