import { useContext, useState } from "react";
import { ModalContext } from "./ModalContext";

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (name) => setModal(name);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
