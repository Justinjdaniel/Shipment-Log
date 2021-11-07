import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Track = () => {
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
    if(data.sender.sender){
      const senderData = data.sender.sender.split('+^');
      setSenderArray(senderData);
    }
    if(data.receipt.receiver){
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
        <ul className="timeline timeline-centered">
          <li className="timeline-item">
            <div className="timeline-info">
              <span>
                {new Date(data.sender.shipmentTimestamp).toLocaleString()}
              </span>
            </div>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3 className="timeline-title">Sender</h3>
              <p className="text-start">
                Name: {senderArray[0]}
                <br />
                Address: {senderArray[1]}
                <br />
                Contact No: {senderArray[2]}
                <br />
                Shipment Content: {senderArray[3]}
              </p>
            </div>
          </li>
          {data.approval.approvalTimestamp && (
            <li className="timeline-item">
              <div className="timeline-info">
                <span>
                  {new Date(data.approval.approvalTimestamp).toLocaleString()}
                </span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Customs</h3>
                <p className="">
                  Approval ID: {data.approval.approvalID}
                  <br />
                  Approved By: {data.approval.approvedBy}
                </p>
              </div>
            </li>
          )}
          {data.dispatch.dispatchTimestamp && (
            <>
              <li className="timeline-item">
                <div className="timeline-info">
                  <span>
                    {new Date(data.dispatch.dispatchTimestamp).toLocaleString()}
                  </span>
                </div>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Port Authority</h3>
                  <p className="text-start">
                    Verification ID: {data.dispatch.verificationID}
                    <br />
                    Port Address: {data.dispatch.portData}
                  </p>
                </div>
              </li>
              <li className="timeline-item period">
                <div className="timeline-info"></div>
                <div className="timeline-marker"></div>
                {/* <div className="timeline-content">
        </div> */}
                <h2 className="timeline-title">
                  <img src="cargo-ship.png" alt="cargo" width="175" />
                </h2>
              </li>
            </>
          )}
          {data.arrival.clearanceTimestamp && (
            <li className="timeline-item">
              <div className="timeline-info">
                <span>
                  {new Date(data.arrival.clearanceTimestamp).toLocaleString()}
                </span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Clearance</h3>
                <p className="text-start">
                  Arrival Port: {data.arrival.arrivalPortData}
                  <br />
                  Arrival Time:{' '}
                  {new Date(data.arrival.arrivalTimestamp).toLocaleString()}
                  <br />
                  Clearance ID: {data.arrival.clearanceID}
                </p>
              </div>
            </li>
          )}
          {data.receipt.receiptTimestamp && (
            <li className="timeline-item">
              <div className="timeline-info">
                <span>
                  {new Date(data.receipt.receiptTimestamp).toLocaleString()}
                </span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Delivery</h3>
                <p className="">
                  Name: {receiverArray[0]}
                  <br />
                  Address: {receiverArray[1]}
                  <br />
                  Contact No: {receiverArray[2]}
                </p>
              </div>
            </li>
          )}
        </ul>
      ) : (
        <h1>
          Search with Shipment ID
          <br /> to track shipment
        </h1>
      )}
    </>
  );
};

export default Track;
