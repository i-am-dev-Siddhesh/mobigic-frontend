import LoginForm from "@/components/Forms/LoginForm";
import { getSession, signIn, useSession } from "next-auth/react";
import NextRouter from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopUp] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      NextRouter.replace("/");
    }
  }, [session]);

  const onSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
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
    } catch (error: any) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
