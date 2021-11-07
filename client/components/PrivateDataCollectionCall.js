import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PrivateDataCollectionCall = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [data, setData] = useState('');
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
      .get(`http://localhost:5000/api/privateCall`, {
        params: {
          shipmentId,
        },
        timeout: 5000,
      })
      .then((res) => {
        return res.data.privateData;
      })
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: 'error',
          title: 'Oops...<br/>Something went wrong!',
        });
      });
    setData(data);
  };

  return (
    <div>
      <div className="p-3">
        <h1>Private Data</h1>
      </div>

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
        <h2>{data}</h2>
      ) : (
        <h1>
          Search with Shipment ID
          <br /> to view Private data
        </h1>
      )}
    </div>
  );
};

export default PrivateDataCollectionCall;
