import styles from "./Button.module.css";

type ButtonProps = {
  value: string;
  onClick?: () => void;
  customStyles?: React.CSSProperties;
};

export const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  customStyles,
}) => {
  return (
    <button
      style={{ ...customStyles }}
      className={styles.btn}
      type="submit"
      {...(onClick ? { onClick } : {})}
    >
      {value}
    </button>
  );
};
