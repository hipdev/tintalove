import Footer from "./footer";
import Header from "./header/header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="bg-white">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
