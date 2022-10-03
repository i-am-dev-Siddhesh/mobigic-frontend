import ResetPasswordForm from "@/components/Forms/ResetPasswordForm";

export default function ResetPasswordPage(props: any) {
  return (
    <>
      <ResetPasswordForm token={props.token} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const token = context.query.token;
  context.query = {};
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
}
