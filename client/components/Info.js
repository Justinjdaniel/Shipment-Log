import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Info = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [data, setData] = useState('');
  const [senderArray, setSenderArray] = useState([]);
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
        <div className="container bg-light text-dark rounded-3 p-3">
          <h1 className="display-3 fw-bold mb-4">Shipment Info</h1>
          {!data.sender.shipmentTimestamp ? (
            <h1>Shipment Info Not Available</h1>
          ) : (
            <div className="row g-3 text-start">
              <div className="col">
                <div className="shadow bg-white rounded-3 p-3">
                  <h3 className="text-center display-6 fs-5 fw-bold">Sender</h3>
                  <p>Sender Name: {senderArray[0]}</p>
                  <p>Shipment Content: {senderArray[1]}</p>
                  <p>Contact No: {senderArray[2]}</p>
                  <p>Contact Address: {senderArray[3]}</p>
                  <p>Shipment Timestamp: {data.sender.shipmentTimestamp}</p>
                </div>
              </div>
              {data.approval.approvalTimestamp && (
                <div className="col">
                  <div className="shadow bg-white p-3 rounded-3">
                    <h3 className="text-center display-6 fs-5 fw-bold">
                      Customs
                    </h3>
                    <p>Approved By: {data.approval.approvalID}</p>
                    <p>Approved By: {data.approval.approvedBy}</p>
                    <p>Approved By: {data.approval.approvalTimestamp}</p>
                  </div>
                </div>
              )}
              {data.dispatch.dispatchTimestamp && (
                <div className="col">
                  <div className="shadow bg-white p-3 rounded-3">
                    <h3 className="text-center display-6 fs-5 fw-bold">
                      Dispatch Port
                    </h3>
                    <p>Verification ID : {data.dispatch.verificationID}</p>
                    <p>Dispatch Port Address: {data.dispatch.portData}</p>
                    <p>Dispatch Timestamp: {data.dispatch.dispatchTimestamp}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <h1>
          Search with Shipment ID
          <br /> to view shipment info
        </h1>
      )}
    </>
  );
};

export default Info;
