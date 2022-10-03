import CustomInput from "@/components/FormComponents/CustomInput";
import { errorFormatter } from "@/utils/helper";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowUp } from "react-icons/fi";
import { toast } from "react-toastify";
import { CustomButton } from "src/core/Button/Button";
import styles from "./upload.module.css";

const UploadFileForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const fd = new FormData();
      const fileFromInput = values?.file[0];

      fd.append("file", fileFromInput);

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/user/file`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            apikey: process.env.NEXT_PUBLIC_SERVER_API_KEY as string,
          },
          withCredentials: true,
        }
      );

      if (resp.data.status) {
        toast.success(
          `${resp?.data?.message}  having File name: ${resp?.data?.file} and Security code is: ${resp?.data?.code}`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
          }
        );
      } else {
        throw {
          message: "Something went wrong",
        };
      }

      router.push("/");
      reset();
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
          <h1 style={{ fontSize: "27px", marginBottom: "20px" }}>
            Upload File
          </h1>

          <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: "flex", gap: 10 }}>
                <CustomInput
                  type="file"
                  placeholder="File*"
                  register={register}
                  hookValue="file"
                  errors={errors}
                  style={{ marginBottom: "20px" }}
                ></CustomInput>
              </div>

              <CustomButton
                type="submit"
                isSubmitting={isSubmitting}
                label={`Upload`}
                icon={
                  <FiArrowUp
                    size={18}
                    style={{ marginLeft: "5px" }}
                    color="#ffffff"
                  />
                }
                iconPosition="right"
              />
            </form>

            <p className={styles.signin_link} style={{ marginTop: "20px" }}>
              Cancel upload file?{" "}
              <Link href="/" passHref>
                <a>Go to Home</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFileForm;
