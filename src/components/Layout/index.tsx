import Navbar from "../Navbar";

const BasicLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default BasicLayout;
