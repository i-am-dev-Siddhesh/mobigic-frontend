 import styles from "./layout.module.css";

const BasicLayout = ({ children }: any) => {
  return (
    <>
 
      <div className="max_width layoutPadding" style={{ margin: "50px auto" }}>
        {children}
      </div>
    </>
  );
};

export default BasicLayout;
