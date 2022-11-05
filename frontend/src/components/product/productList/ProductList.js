import React, { useState, useEffect } from "react";
import axios from "axios";

import "./productList.scss"
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Table, Button, Card, Modal, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Search from "../../search/Search";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import jsPDF from "jspdf";
import "jspdf-autotable";


const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const [user, setuser] = useState(" ");
  const [dispatchID, setdispatchID] = useState(" ");
  const [driverName, setdriverName] = useState(" ");
  const [vehicleId, setvehicleId] = useState(" ");
  const [route, setroute] = useState(" ");
  const [date, setdate] = useState(" ");
  const [cost, setcost] = useState(" ");
  const [status, setstatus] = useState(" ");

  const [_id, setid] = useState(" ");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (_id, user, dispatchID, driverName, vehicleId, route, date, cost, status) => {
    setShow(true);
    setid(_id);
    setuser(user);
    setdispatchID(dispatchID);
    setdriverName(driverName);
    setvehicleId(vehicleId);
    setroute(route);
    setdate(date);
    setcost(cost);
    setstatus(status);

  }
  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const updateUser = (e) => {
    e.preventDefault();
    update(e)
  };


  function update() {
    const newTime = {
      _id, user, dispatchID, driverName, vehicleId, route, date, cost, status
    }

    axios.patch("http://localhost:5000/api/products/"+_id, newTime).then(() => {


      setuser('');
      setdispatchID('');
      setdriverName('');
      setvehicleId('');
      setroute('');
      setdate('');
      setcost('');
      setstatus('');
      alert("Updated Successfully");
      window.location.reload();
    }).catch((err => {
      alert(err)
    }))


  }

  const generateReport = () => {
    const doc = new jsPDF();
    const title = "Service Dispatch";
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, "center");
    doc.setTextColor(0);
    doc.setFontSize(12);

    doc.setFontSize(8);
    doc.text(
        `*This Report is automatically generated.`,
        20,
        35,
        null,
        null
    );

    const headers = [
        [    "Index",
            "Dispatch ID",
            "Driver Name",
            "Vehicle Id",
            "Route",
            "Date",
            "Cost",
            "Status",

        ],
    ];

    const data = products.map((reserve, index) => [
        index,
        reserve.dispatchID,
        reserve.driverName,
        reserve.vehicleId,
        reserve.route,
        reserve.date,
        reserve.cost,
        reserve.status,

    ]);
    let contents = {
        startY: 20,
        head: headers,
        body: data,
    };
    doc.autoTable(contents);
    doc.save("Dispatch_Data_Report.pdf");
};

  return <div className="product-list">

    <hr />

    <div className="table">

      <div className="--flex-between --flex-dir-column">

        <span>
          <h3>Service Dispatch</h3>
        </span>

        <span>
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}

          />

        </span>
      </div>
      <Button onClick={() => generateReport()}>Download PDF</Button>

      {isLoading && <SpinnerImg />}
      <div className="table">
        {!isLoading && products.length === 0 ? (
          <p>-- No dispatch details found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>DispatchID</th>
                <th>DriverName</th>
                <th>VehicleId</th>
                <th>Route</th>
                <th>Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.filter(Products => {
                if (search === "") {
                  return Products
                }
                else if (Products.driverName.toLowerCase().includes(search.toLowerCase())) {
                  return Products
                }
              }).map((Products,) => {
                const {
                  _id,
                  user,
                  dispatchID,
                  driverName,
                  vehicleId,
                  route,
                  date,
                  cost,
                  status, } = Products;
                return (
                  <tr key={user}>
                    <td>{dispatchID}</td>
                    <td>{driverName}</td>
                    <td>{vehicleId}</td>
                    <td>{route}</td>
                    <td>{date}</td>
                    <td>{cost}</td>
                    <td>{status}</td>
                    <td className="icons">
                      <span>
                        <Link to={`/product/${_id}`}>
                          <AiOutlineEye size={25} color={"purple"} />
                        </Link>
                      </span>
                   

                          <FaEdit size={20} color={"green"}
                            onClick={() => handleShow(Products._id, Products.user, Products.dispatchID, Products.driverName, Products.vehicleId, Products.route, Products.date, Products.cost, Products.status)} />
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => confirmDelete(_id)}

                        />
                      </span>


                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>


        )}

      </div>

    </div>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Details </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <Form >
         

          <div >
            <Form.Label>dispatch ID : </Form.Label >
            <Form.Control placeholder="dispatchID"
              value={dispatchID}
              onChange={(e) => setdispatchID(e.target.value)} />
          </div>

          <div >
            <Form.Label>Driver Name :</Form.Label >
            <Form.Control placeholder="driverName"
              value={driverName}
              onChange={(e) => setdriverName(e.target.value)} />
          </div>
          <div >

            <Form.Label>Vehicle Id :</Form.Label >
            <Form.Control placeholder="vehicleId"
              value={vehicleId}
              onChange={(e) => setvehicleId(e.target.value)} />
          </div>

          <div >

            <Form.Label>Route :</Form.Label >
            <Form.Control placeholder="route"
              value={route}
              onChange={(e) => setroute(e.target.value)} />
          </div>
          <div >
            <Form.Label>Date: </Form.Label >
            <Form.Control placeholder="date"
              value={date}
              onChange={(e) => setdate(e.target.value)} />
          </div>
          <div >
            <Form.Label>Cost : </Form.Label >
            <Form.Control placeholder="Cost"
              value={cost}
              onChange={(e) => setcost(e.target.value)} />
          </div>    <div >
            <Form.Label>Status : </Form.Label >
            <Form.Control placeholder="date"
              value={status}
              onChange={(e) => setstatus(e.target.value)} />
          </div>
          <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

            <Button variant="outline-success" type="submit" onClick={(e) => updateUser(e)}>Edit</Button>
            {' '}<Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div >

        </Form>
      </Modal.Body>

    </Modal>
  </div>;

};

export default ProductList