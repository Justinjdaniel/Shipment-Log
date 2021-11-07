import Meta from './Meta';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav/>
        <main className="position-relative">
          {children}
        </main>
    </>
  );
};

export default Layout;
