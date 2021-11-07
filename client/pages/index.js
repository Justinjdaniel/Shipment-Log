import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div id="Welcome">
      <Head>
        <title>Welcome | Shipment Log</title>
      </Head>
      <div className="header">
        <div className="content flex flex-column">
          <h1 className="display-2 text-uppercase fw-bold">
            <img
              src="ship-logo.png"
              alt="logo"
              height="100"
              className="d-inline-block align-text-top me-4"
            />
            Shipment<span className="text-danger fw-bold">Log</span>
          </h1>
          <Link href="/login">
            <button className="btn btn-lg blur btn-outline-light rounded-pill shadow px-5 fw-bold">
              Get Started
            </button>
          </Link>
        </div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <div className="footer flex">
        <p className="fw-bold display-6 fs-6 text-uppercase">
          Shipment<span className="text-danger">Log</span> | 2021 &copy;
        </p>
        <p className="text-muted text-end">
           by
          <a
            href="https://justinjdaniel.github.io/"
            className="text-primary text-uppercase text-decoration-none"
            target="_blank"
            rel="noopener"
          >
            {' '}
            Justin J Daniel
          </a>
        </p>
      </div>
    </div>
  );
}
