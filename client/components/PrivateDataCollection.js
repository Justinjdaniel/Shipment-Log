import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Animation from '../components/Animation/Animation';

const PrivateDataCollection = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [privateData, setPrivateData] = useState('');
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
    setPrivateData('');
  };

  // POST REQUEST
  const createData = async () => {
    setIsTxn(!isTxn);
    axios
      .post(`http://localhost:5000/api/privateSend`, {
        // data
        shipmentId,
        secret: privateData,
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
    <div className="px-5">
      {isTxn ? (
        <div className="position-relative m-5 p-5">
          <Animation />
        </div>
      ) : (
        <form
          className="row g-3 needs-validation mt-3 text-dark px-5"
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
            <label htmlFor="shipment-id" className="form-label ms-2 fs-5">
              Shipment ID
            </label>
          </div>
          <div className="col-md-6 form-floating">
            <input
              type="text"
              className="form-control"
              id="private-data"
              value={privateData}
              onChange={(e) => setPrivateData(e.target.value)}
              placeholder="Private Data"
              required
            />
            <label htmlFor="private-data" className="form-label ms-2 fs-5">
              Private Data
            </label>
          </div>
          <div className="col-12">
            <button
              className="btn btn-lg btn-primary px-5 shadow"
              type="submit"
            >
              Add Private Data
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PrivateDataCollection;
