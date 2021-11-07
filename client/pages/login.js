import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Waves from '../components/Waves';

const Login = () => {
  return (
    <div id="Login">
      <Head>
        <title>Login | Shipment Log</title>
      </Head>
      <div className="header">
        <div className="content flex">
          <div className="blur container px-5 pb-5">
            <h1 className="display-1 text-dark text-start mb-5 fw-bold">
              Login
            </h1>
            <div className="row row-cols-6 justify-content-center g-3 login-card">
              <Link href="/sender">
                <div id="Sender" className="col">
                  <img
                    src="package.png"
                    alt="package"
                    className="img-fluid mb-2"
                    width="140"
                  />
                  <h3 className="display-6 fs-3">Sender</h3>
                </div>
              </Link>
              <Link href="/customs">
                <div id="Customs" className="col">
                  <img
                    src="approval.png"
                    alt="package-check"
                    className="img-fluid mb-2"
                    width="140"
                  />
                  <h3 className="display-6 fs-3">Customs</h3>
                </div>
              </Link>
              <Link href="/port">
                <div id="Dispatch-Port" className="col">
                  <img
                    src="cargo.png"
                    alt="package-check"
                    className="img-fluid mb-2"
                    width="140"
                  />
                  <h3 className="display-6 fs-3">Cargo Port</h3>
                </div>
              </Link>
              <Link href="/clearance">
                <div id="Arrival-Port" className="col">
                  <img
                    src="clearance.png"
                    alt="package-verify"
                    className="img-fluid mb-2"
                    width="140"
                  />
                  <h3 className="display-6 fs-3">Clearance</h3>
                </div>
              </Link>
              <Link href="/receiver">
                <div id="Receiver" className="col">
                  <img
                    src="delivery.png"
                    alt="delivery"
                    className="img-fluid mb-2"
                    width="140"
                  />
                  <h3 className="display-6 fs-3">Receiver</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Waves />
      </div>
    </div>
  );
};

export default Login;
