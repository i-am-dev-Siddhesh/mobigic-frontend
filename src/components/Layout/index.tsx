import Navbar from "../Navbar";

const BasicLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div style={{padding:"1rem 2rem"}}>{children}</div>
    </>
  );
};

export default BasicLayout;
