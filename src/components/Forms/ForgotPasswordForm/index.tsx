import CustomInput from "@/components/FormComponents/CustomInput";
import UserService from "@/services/User";
import { errorFormatter } from "@/utils/helper";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { CustomButton } from "src/core/Button/Button";
import styles from "./forgotpassword.module.css";

const ForgotPasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      const resp: any = await UserService.forgotPassword({
        email: values?.email as string,
      });
      reset();
      toast.success(resp?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      return resp;
    } catch (error) {
      const message = typeof error === "string" ? error : errorFormatter(error);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.parent}>
        <div className={styles.signin_box}>
          <div className={styles.login_container}>
            <h1 style={{ fontSize: "27px", marginBottom: "20px" }}>
              Forgot your password
            </h1>
          </div>

          <div className={styles.login_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                type="email"
                placeholder="Email address"
                register={register}
                hookValue="email"
                errors={errors}
                style={{ marginBottom: "30px" }}
              ></CustomInput>

              <CustomButton
                type="submit"
                isSubmitting={isSubmitting}
                label="Send me reset link"
              />
            </form>

            <p className={styles.link} style={{ marginTop: "20px" }}>
              <FiArrowLeft size={18} style={{ marginRight: "5px" }} />{" "}
              <Link href="/signin" passHref>
                <a>Go back to log in</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
