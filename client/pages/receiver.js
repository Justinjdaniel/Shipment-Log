import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Animation from '../components/Animation/Animation';
import Receipt from '../components/Receipt';
import Track from '../components/Track';
import Waves from '../components/Waves';

const Receiver = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [contactAddress, setContactAddress] = useState('');
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
    setName('');
    setContactNo('');
    setContactAddress('');
  };
  // POST REQUEST
  const createData = async () => {
    setIsTxn(!isTxn);
    axios
      .post(`http://localhost:5000/api/receipt`, {
        // data
        shipmentId,
        name,
        contactNo,
        contactAddress,
      })
      .then((res) => {
        console.log(res);
        setIsTxn(isTxn);
        Toast.fire({
          icon: 'success',
          title: 'Shipment Receiver Added Successfully',
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
    <div id="Receiver">
      <Head>
        <title>Receiver | Shipment Log</title>
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
                  className="nav-link link-dark fs-5 active"
                  id="nav-track-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-track"
                  type="button"
                  role="tab"
                  aria-controls="nav-track"
                  aria-selected="false"
                >
                  Track Shipment
                </button>
                <button
                  className="nav-link link-dark fs-5"
                  id="nav-shipment-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-shipment"
                  type="button"
                  role="tab"
                  aria-controls="nav-shipment"
                  aria-selected="true"
                >
                  Delivery Info
                </button>
                <button
                  className="nav-link link-dark fs-5"
                  id="nav-receipt-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-receipt"
                  type="button"
                  role="tab"
                  aria-controls="nav-receipt"
                  aria-selected="true"
                >
                  Receipt
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade p-3 px-5 text-dark"
                id="nav-shipment"
                role="tabpanel"
                aria-labelledby="nav-shipment-tab"
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
                    <div className="col-md-4 form-floating">
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
                    <div className="col-md-4 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="receiver"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Receiver"
                        required
                      />
                      <label
                        htmlFor="receiver"
                        className="form-label ms-2 fs-5"
                      >
                        Receiver Name
                      </label>
                    </div>
                    <div className="col-md-4 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="contact-id"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        placeholder="Contact Number"
                        required
                      />
                      <label
                        htmlFor="contact-id"
                        className="form-label ms-2 fs-5"
                      >
                        Contact Number
                      </label>
                    </div>
                    <div className="col-md-12 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={contactAddress}
                        onChange={(e) => setContactAddress(e.target.value)}
                        placeholder="Delivery Address"
                        required
                      />
                      <label htmlFor="address" className="form-label ms-2 fs-5">
                        Delivery Address
                      </label>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-lg btn-primary px-5 shadow"
                        type="submit"
                      >
                        Confirm Delivery
                      </button>
                    </div>
                  </form>
                )}
              </div>
              <div
                className="tab-pane show active fade container-h overflow-auto"
                id="nav-track"
                role="tabpanel"
                aria-labelledby="nav-track-tab"
              >
                <Track />
              </div>
              <div
                className="tab-pane fade container-h overflow-auto text-dark"
                id="nav-receipt"
                role="tabpanel"
                aria-labelledby="nav-receipt-tab"
              >
                <Receipt />
              </div>
            </div>
          </div>
        </div>
        <Waves />
      </div>
    </div>
  );
};

export default Receiver;
