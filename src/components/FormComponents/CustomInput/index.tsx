import styles from "./custominput.module.css";

const CustomInput = ({
  type,
  placeholder,
  register,
  hookValue,
  errors,
  style,
}: Props) => {
  return (
    <div style={style}>
      <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        {...register(hookValue)}
      />
      {errors[hookValue] && <span>This field is required</span>}
    </div>
  );
};

export default CustomInput;

interface Props {
  type: string;
  placeholder: string;
  register: any;
  hookValue: string;
  errors: any;
  style?: any;
}
