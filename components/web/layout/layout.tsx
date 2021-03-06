import Footer from "./footer";
import Header from "./header/header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-white">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
