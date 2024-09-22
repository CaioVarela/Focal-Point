import style from "./button.module.scss";

interface ButtonProps {
  buttonText: string;
  variant: "ConfirmationButton" | "CancelButton" | "DeleteButton" | "AddButton";
  onClick?: () => void;
}

export default function Button({ buttonText, variant, onClick }: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "ConfirmationButton":
        return style.confirmationButton;
      case "CancelButton":
        return style.cancelButton;
      case "AddButton":
        return style.addButton;
      default:
        return style.deleteButton;
    }
  };

  return (
    <button className={getButtonStyle()} onClick={onClick}>
      <span className={style.buttonText}>{buttonText}</span>
    </button>
  );
}
