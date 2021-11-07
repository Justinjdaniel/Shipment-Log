import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Animation from '../components/Animation/Animation';
import Info from '../components/Info';
import Waves from '../components/Waves';

const Clearance = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [clearanceOfficer, setClearanceOfficer] = useState('');
  const [clearanceID, setClearanceID] = useState('');
  const [arrivalPortAddress, setArrivalPortAddress] = useState('');
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
    setArrivalPortAddress('');
    setArrivalDate('');
    setArrivalTime('');
    setClearanceOfficer('');
    setClearanceID('');
  };
  // POST REQUEST
  const createData = async () => {
    setIsTxn(!isTxn);
    const arrivalTimestamp = `${arrivalDate}T${arrivalTime}`;
    axios
      .post(`http://localhost:5000/api/clearance`, {
        // data
        shipmentId,
        arrivalPortData: arrivalPortAddress,
        arrivalTimestamp,
        clearanceID,
      })
      .then((res) => {
        console.log(res);
        setIsTxn(isTxn);
        Toast.fire({
          icon: 'success',
          title: 'Shipment Clearance Added Successfully',
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
    <div id="Clearance">
      <Head>
        <title>Clearance | Shipment Log</title>
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
                  id="nav-clearance-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-clearance"
                  type="button"
                  role="tab"
                  aria-controls="nav-clearance"
                  aria-selected="false"
                >
                  Shipment Clearance
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade p-3 px-5 text-dark"
                id="nav-clearance"
                role="tabpanel"
                aria-labelledby="nav-clearance-tab"
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
                        type="date"
                        className="form-control"
                        id="arrival-date"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        placeholder="Arrival Date"
                        required
                      />
                      <label
                        htmlFor="arrival-date"
                        className="form-label ms-2 fs-5"
                      >
                        Arrival Date
                      </label>
                    </div>
                    <div className="col-md-4 form-floating">
                      <input
                        type="time"
                        className="form-control"
                        id="arrival-time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        placeholder="Arrival Time"
                        required
                      />
                      <label
                        htmlFor="arrival-time"
                        className="form-label ms-2 fs-5"
                      >
                        Arrival Time
                      </label>
                    </div>
                    <div className="col-md-6 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="clearance-officer"
                        value={clearanceOfficer}
                        onChange={(e) => setClearanceOfficer(e.target.value)}
                        placeholder="Clearance"
                        required
                      />
                      <label
                        htmlFor="clearance-officer"
                        className="form-label ms-2 fs-5"
                      >
                        Clearance Officer
                      </label>
                    </div>
                    <div className="col-md-6 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="clearance-id"
                        value={clearanceID}
                        onChange={(e) => setClearanceID(e.target.value)}
                        placeholder="clearance ID"
                        required
                      />
                      <label
                        htmlFor="clearance-id"
                        className="form-label ms-2 fs-5"
                      >
                        Clearance ID
                      </label>
                    </div>
                    <div className="col-md-12 form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="port-address"
                        value={arrivalPortAddress}
                        onChange={(e) => setArrivalPortAddress(e.target.value)}
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
                        Add Clearance
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
            </div>
          </div>
        </div>
        <Waves />
      </div>
    </div>
  );
};

export default Clearance;
