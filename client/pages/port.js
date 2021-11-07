import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Animation from '../components/Animation/Animation';
import Info from '../components/Info';
import PrivateDataCollectionCall from '../components/PrivateDataCollectionCall';
import Waves from '../components/Waves';

const Port = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [verificationID, setVerificationID] = useState('');
  const [portAddress, setPortAddress] = useState('');
  const [isTxn, setIsTxn] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const onCreate = (e) => {
    e.preventDefault();
    createData();

    setShipmentId('');
    setVerificationID('');
    setPortAddress('');
  };
  // POST REQUEST
  const createData = async () => {
    setIsTxn(!isTxn);
    axios
      .post(`http://localhost:5000/api/verification`, {
        // data
        shipmentId,
        verificationID,
        portData: portAddress,
      })
      .then((res) => {
        console.log(res);
        setIsTxn(isTxn);
        Toast.fire({
          icon: 'success',
          title: 'Shipment Verification Added Successfully',
        });
      })
      .catch((err) => {
        console.error(err);
        setIsTxn(isTxn);
        Toast.fire({
          icon: 'error',
          title: 'Oops...<br/>Something went wrong!',
        });
      });
  };
  return (
    <div id="Port">
      <Head>
        <title>Port | Shipment Log</title>
      </Head>
      <div className="header">
        <div className="content flex">
          <div className="blur container p-4">
            <nav>
              <div
                className="nav nav-tabs nav-justified"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className="nav-link active link-dark fs-5"
                  id="nav-shipment-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-shipment"
                  type="button"
                  role="tab"
                  aria-controls="nav-shipment"
                  aria-selected="true"
                >
                  Shipment Info
                </button>
                <button
                  className="nav-link link-dark fs-5"
                  id="nav-verification-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-verification"
                  type="button"
                  role="tab"
                  aria-controls="nav-verification"
                  aria-selected="false"
                >
                  Shipment Verification
                </button>
                <button
                  className="nav-link link-dark fs-5"
                  id="nav-pdc-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-pdc"
                  type="button"
                  role="tab"
                  aria-controls="nav-pdc"
                  aria-selected="false"
                >
                  Private Data
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade p-3 px-5 text-dark"
                id="nav-verification"
                role="tabpanel"
                aria-labelledby="nav-verification-tab"
              >
                {isTxn ? (
                  <div className="position-relative m-5 p-5">
                    <Animation />
                  </div>
                ) : (
                  <form
                    className="row g-3 needs-validation mt-3"
                    onSubmit={onCreate}
                  >
                    <div className="col-md-6 form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="shipment-id"
                        value={shipmentId}
                        placeholder="Shipment ID"
                        onChange={(e) => setShipmentId(e.target.value)}
                        required
                      />
                      <label
                        htmlFor="shipment-id"
                        className="form-label ms-2 fs-5"
                      >
                        Shipment ID
                      </label>
                    </div>
                    <div className="col-md-6 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="verification-id"
                        value={verificationID}
                        onChange={(e) => setVerificationID(e.target.value)}
                        placeholder="Verification ID"
                        required
                      />
                      <label
                        htmlFor="verification-id"
                        className="form-label ms-2 fs-5"
                      >
                        Verification ID
                      </label>
                    </div>
                    <div className="col-md-12 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="port-address"
                        value={portAddress}
                        onChange={(e) => setPortAddress(e.target.value)}
                        placeholder="Port Address"
                        required
                      />
                      <label
                        htmlFor="port-address"
                        className="form-label ms-2 fs-5"
                      >
                        Port Address
                      </label>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-lg btn-primary px-5 shadow"
                        type="submit"
                      >
                        Add Verification
                      </button>
                    </div>
                  </form>
                )}
              </div>
              <div
                className="tab-pane fade show active container-h overflow-auto"
                id="nav-shipment"
                role="tabpanel"
                aria-labelledby="nav-track-tab"
              >
                <Info />
              </div>
              <div
                className="tab-pane fade container-h overflow-auto"
                id="nav-pdc"
                role="tabpanel"
                aria-labelledby="nav-track-tab"
              >
                <PrivateDataCollectionCall />
              </div>
            </div>
          </div>
        </div>
        <Waves />
      </div>
    </div>
  );
};

export default Port;
