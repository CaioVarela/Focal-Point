import Button from "../button/button";
import styles from "./deleteTaskModal.module.scss";

interface DeleteTaskModalProps {
  closeModal: () => void;
  confirmDelete: () => void;
}

export default function DeleteTaskModal({
  closeModal,
  confirmDelete,
}: DeleteTaskModalProps) {
  return (
    <div className={styles.deleteTaskModalContainer}>
      <div className={styles.deleteModal}>
        <h1 className={styles.titleText}>Deletar tarefa</h1>
        <span className={styles.warningText}>
          Tem certeza que você deseja deletar essa tarefa?
        </span>
        <div className={styles.buttonContainer}>
          <Button
            buttonText="Cancelar"
            variant="CancelButton"
            onClick={closeModal}
          />
          <Button
            buttonText="Deletar"
            variant="DeleteButton"
            onClick={confirmDelete}
          />
        </div>
      </div>
      <div className={styles.overlay} onClick={closeModal} />
    </div>
  );
}
