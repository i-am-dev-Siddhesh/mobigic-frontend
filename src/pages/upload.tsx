import HomePage from "@/components/HomePage";
import BasicLayout from "@/components/Layout";
import UploadFile from "@/components/UploadFile";
import { getSession } from "next-auth/react";
import Head from "next/head";
import UserService from "../services/User";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mobigic front end</title>
        <meta name="description" content="Generated by Mobigic front end" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BasicLayout>
          <UploadFile />
        </BasicLayout>
      </main>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}