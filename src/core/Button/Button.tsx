import { useMemo, useState } from "react";
import styles from "./button.module.css";

export const CustomButton = (props: IButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    if (props.isSubmitting) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [props.isSubmitting]);

  return (
    <div>
      <button
        className={`${styles.btn} ${isLoading && styles["button--loading"]}`}
        disabled={isLoading}
        type={props?.type}
        style={props.style}
        onClick={props.onClick}
      >
        {!isLoading &&
          props?.icon &&
          props.iconPosition === "left" &&
          props.icon}
        {!isLoading && props?.label}
        {!isLoading &&
          props?.icon &&
          props.iconPosition === "right" &&
          props.icon}
      </button>
      <div
        className={styles.button_wrappper}
        style={props.buttonWrappperStyle}
      ></div>
    </div>
  );
};

interface IButtonProps {
  isSubmitting: boolean;
  label: string;
  type: "submit" | "button" | "reset" | undefined;
  icon?: any;
  iconPosition?: "left" | "right";
  style?: any;
  buttonWrappperStyle?: any;
  onClick?: (a:any) => void;
}
