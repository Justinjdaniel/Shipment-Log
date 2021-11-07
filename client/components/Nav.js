import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Nav = () => {
  const router = useRouter();
  const loginUri = router.asPath == '/' || router.asPath == '/login';

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-transparent">
      <div className="container-fluid">
        <img
          src="ship-logo.png"
          alt="logo"
          height="32"
          className="d-inline-block align-text-top mx-2"
        />
        <Link href="/">
          <a className="navbar-brand fw-bold fs-3 text-uppercase">
            Shipment<span className="text-danger fw-bold">Log</span>
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link href="/">
                <a
                  className={`nav-link ${router.asPath == '/' && 'active'}`}
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login">
                <a className={`nav-link ${router.asPath == '/login' && 'active'}`}>
                  Dashboard
                </a>
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link href="/login">
              <button className="btn btn-outline-dark rounded-pill px-4 fw-bold shadow-sm blur">
                {loginUri ? (
                  <>
                    <FaSignInAlt className="me-2" /> Login
                  </>
                ) : (
                  <>
                    <FaSignOutAlt className="me-2" /> Logout
                  </>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
