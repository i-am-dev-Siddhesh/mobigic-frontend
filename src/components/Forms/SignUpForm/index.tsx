import CustomInput from "@/components/FormComponents/CustomInput";
import UserService from "@/services/User";
import { errorFormatter } from "@/utils/helper";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import NextRouter from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { CustomButton } from "src/core/Button/Button";
import styles from "./signup.module.css";

const SignUpForm = ({ onLoginwithGoogle }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const resp: any = await UserService.registerUser({
        name: values.first_name + "" + values.last_name,
        email: values.email,
        password: values.password,
      });
      reset();

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      }).then(({ ok, error }: any) => {
        if (ok) {
          NextRouter.replace("/");
        } else {
          throw error;
        }
      });

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
        <div className={styles.box}>
          <div className={styles.container}>
            <h1 style={{ fontSize: "27px", marginBottom: "20px" }}>
              Create your account{" "}
            </h1>

            <div className={styles.google_btn} onClick={onLoginwithGoogle}>
              <FcGoogle size={25} />
              <div className={styles.google_btn_content}>
                Continue with Google
              </div>
            </div>
          </div>

          <div className={styles.or_section}>
            <div className={styles.or_line}></div> or
            <div className={styles.or_line}></div>
          </div>

          <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: "50%" }}>
                  <CustomInput
                    type="first_name"
                    placeholder="First Name*"
                    register={register}
                    hookValue="first_name"
                    errors={errors}
                    style={{ marginBottom: "20px" }}
                  ></CustomInput>
                </div>
                <div style={{ width: "50%" }}>
                  <CustomInput
                    type="last_name"
                    placeholder="Last Name*"
                    register={register}
                    hookValue="last_name"
                    errors={errors}
                    style={{ marginBottom: "20px" }}
                  ></CustomInput>
                </div>
              </div>
              <CustomInput
                type="email"
                placeholder="Email address*"
                register={register}
                hookValue="email"
                style={{ marginBottom: "20px" }}
                errors={errors}
              ></CustomInput>

              <CustomInput
                type="password"
                placeholder="Your Password"
                register={register}
                hookValue="password"
                style={{ marginBottom: "30px" }}
                errors={errors}
              ></CustomInput>

              <CustomButton
                type="submit"
                isSubmitting={isSubmitting}
                label={`Signup`}
                icon={
                  <FiArrowRight
                    size={18}
                    style={{ marginLeft: "5px" }}
                    color="#ffffff"
                  />
                }
                iconPosition="right"
              />
            </form>

            <p className={styles.link} style={{ marginTop: "20px" }}>
              Already have an account?{" "}
              <Link href="/signin">
                <a className={styles.link_text}>Log in</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
