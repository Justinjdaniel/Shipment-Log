import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Receipt = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [data, setData] = useState('');
  const [senderArray, setSenderArray] = useState([]);
  const [receiverArray, setReceiverArray] = useState([]);
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

  const onSearch = (e) => {
    e.preventDefault();

    if (!shipmentId) {
      alert('Please enter a valid shipment Id');
      return;
    }
    getData();
  };
  // GET REQUEST
  const getData = async () => {
    const data = await axios
      .get(`http://localhost:5000/api/read`, {
        params: {
          shipmentId,
        },
        timeout: 5000,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: 'error',
          title: 'Oops...<br/>Something went wrong!',
        });
      });
    setData(data);
    if (data.sender.sender) {
      const senderData = data.sender.sender.split('+^');
      setSenderArray(senderData);
    }
    if (data.receipt.receiver) {
      const receiverData = data.receipt.receiver.split('+^');
      setReceiverArray(receiverData);
    }
  };
  return (
    <>
      <form className="row g-1 mb-3 text-dark" onSubmit={onSearch}>
        <div className="col-md-3 form-floating">
          <input
            type="number"
            className="form-control form-control-sm"
            id="shipmentId"
            value={shipmentId}
            placeholder="Shipment ID"
            onChange={(e) => setShipmentId(e.target.value)}
            required
          />
          <label htmlFor="shipmentId" className="form-label ms-2 fs-5">
            Shipment ID
          </label>
        </div>
        <div className="col-md-1">
          <button
            className="btn btn-lg btn-primary rounded-circle fs-3 shadow"
            type="submit"
          >
            <FaSearch />
          </button>
        </div>
      </form>
      {data ? (
        <div className="container bg-light rounded-3 p-3 px-5">
          <h1 className="display-3 fw-bold mb-4">Receipt</h1>
          {!data.receipt.receiptTimestamp ? (
            <h3 className="display-4">
              Receipt will be generated after shipment was delivered
            </h3>
          ) : (
            <>
              <div className="text-start row g-3">
                <div className="col">
                  <h5 className="fw-bold">From,</h5>
                  <p className="px-5">
                    <span className="text-capitalize">{senderArray[0]}</span>
                    <br />
                    <span className="text-capitalize">{senderArray[3]}</span>
                    <br />
                    <span className="text-capitalize">{senderArray[1]}</span>
                    <br /> Dispatched Time:{' '}
                    <span className="text-capitalize">
                      {new Date(
                        data.sender.shipmentTimestamp
                      ).toUTCString()}
                    </span>
                  </p>
                </div>
                <div className="col">
                  <h5 className="fw-bold">Delivered To,</h5>
                  <p className="px-5">
                    <span className="text-capitalize">{receiverArray[0]}</span>
                    <br />
                    <span className="text-capitalize">{receiverArray[2]}</span>
                    <br />
                    <span className="text-capitalize">{receiverArray[1]}</span>
                    <br />
                    Delivery Time:{' '}
                    <span className="text-capitalize">
                      {new Date(data.receipt.receiptTimestamp).toUTCString()}
                    </span>
                  </p>
                </div>
              </div>
              <p className="fs-5 p-2 text-start">
                Package Content : {senderArray[2]}
              </p>
            </>
          )}
        </div>
      ) : (
        <h1>
          Search with Shipment ID
          <br /> to view shipment receipt
        </h1>
      )}
    </>
  );
};

export default Receipt;
