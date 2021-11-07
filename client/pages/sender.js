import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Animation from '../components/Animation/Animation';
import Track from '../components/Track';
import Waves from '../components/Waves';

const Sender = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNo, setDeliveryNo] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
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
    setContent('');
    setContactNo('');
    setAddress('');
    setDeliveryNo('');
    setDeliveryAddress('');
  };
  // POST REQUEST
  const createData = async () => {
    setIsTxn(!isTxn);
    axios
      .post(`http://localhost:5000/api/create`, {
        // data
        shipmentId,
        name,
        content,
        contactNo,
        contactAddress: address,
        deliveryNo,
        deliveryAddress,
      })
      .then((res) => {
        console.log(res);
        setIsTxn(isTxn);
        Toast.fire({
          icon: 'success',
          title: 'Shipment Added Successfully',
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
    <div id="Sender">
      <Head>
        <title>Sender | Shipment Log</title>
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
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active p-3 px-5 text-dark"
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
                        id="sender"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sender Name"
                        required
                      />
                      <label htmlFor="sender" className="form-label ms-2 fs-5">
                        Sender Name
                      </label>
                    </div>
                    <div className="col-md-4 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="shipment-data"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Shipment Data"
                        required
                      />
                      <label
                        htmlFor="shipment-data"
                        className="form-label ms-2 fs-5"
                      >
                        Shipment Content
                      </label>
                    </div>
                    <div className="col-md-3 form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="contact-no"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        placeholder="Contact No"
                        required
                      />
                      <label
                        htmlFor="contact-no"
                        className="form-label ms-2 fs-5"
                      >
                        Sender Contact No
                      </label>
                    </div>
                    <div className="col-md-6 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="sender-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Sender Address"
                        required
                      />
                      <label
                        htmlFor="sender-address"
                        className="form-label ms-2 fs-5"
                      >
                        Sender Address
                      </label>
                    </div>
                    <div className="col-md-3 form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="delivery-no"
                        value={deliveryNo}
                        onChange={(e) => setDeliveryNo(e.target.value)}
                        placeholder="Delivery Contact No"
                        required
                      />
                      <label
                        htmlFor="delivery-no"
                        className="form-label ms-2 fs-5"
                      >
                        Delivery Contact No
                      </label>
                    </div>
                    <div className="col-md-12 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="delivery-address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Delivery Address"
                        required
                      />
                      <label
                        htmlFor="delivery-address"
                        className="form-label ms-2 fs-5"
                      >
                        Delivery Address
                      </label>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-lg btn-primary px-5"
                        type="submit"
                      >
                        Add Shipment
                      </button>
                    </div>
                  </form>
                )}
              </div>
              <div
                className="tab-pane fade container-h overflow-auto"
                id="nav-track"
                role="tabpanel"
                aria-labelledby="nav-track-tab"
              >
                <Track />
              </div>
            </div>
          </div>
        </div>
        <Waves />
      </div>
    </div>
  );
};

export default Sender;
