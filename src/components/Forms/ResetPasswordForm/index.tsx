import CustomInput from "@/components/FormComponents/CustomInput";
import UserService from "@/services/User";
import { errorFormatter } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import NextRouter from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { CustomButton } from "src/core/Button/Button";
import styles from "./resetpassword.module.css";

const ResetPasswordForm = ({ token }: any) => {
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
      const resp: any = await UserService.resetPassword(
        {
          password: values?.password as string,
          passwordConfirmation: values?.passwordConfirmation as string,
        },
        { token }
      );
      reset();
      NextRouter.replace("/signin");
      toast.success(resp?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const message = typeof error === "string" ? error : errorFormatter(error);
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
              Reset your password
            </h1>
          </div>

          <div className={styles.login_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                type="password"
                placeholder="Password"
                register={register}
                hookValue="password"
                errors={errors}
                style={{ marginBottom: "30px" }}
              ></CustomInput>

              <CustomInput
                type="password"
                placeholder="Password Confirmation"
                register={register}
                hookValue="passwordConfirmation"
                errors={errors}
                style={{ marginBottom: "30px" }}
              ></CustomInput>

              <CustomButton
                type="submit"
                isSubmitting={isSubmitting}
                label="Reset Password"
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

export default ResetPasswordForm;
