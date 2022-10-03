import SignUpPage from "@/components/Signup";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

const SignupPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Mobigic : Register Page</title>
        <meta name="description" content="Mobigic : Register Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpPage />
    </div>
  );
};

export default SignupPage;

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
