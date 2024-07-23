import React, { useEffect, useState } from "react";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { Link } from "react-router-dom";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { Modal } from "antd";

const ContactUs = () => {
  const [setSession, getSession] = useSession();
  const [deleteProductData, setDeleteProductData] = useState(false);

  const [contactData, setContactData] = useState([]);

  const [opneModal, setOpenModal] = useState(false);

  const [id, setId] = useState(null);

  const handleOpen = (id) => {
    setId(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  let token = getSession("authorization");

  useEffect(() => {
    const credentials = {
      page: 1, // optional (default value 1)
      count: 10,
    };

    AddData({ url: "query/list", cred: credentials, token: token })
      .then((res) => {
        setContactData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteProductData]);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      // ...columnSearchProps("name"),
    },

    {
      title: "Mobile",
      key: "mobile",
      dataIndex: "mobile",
    },
    {
      title: "Created Date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (_, elem) => (
        <span>{new Date(elem?.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (elem) => (
        <div className=" text-center px-2 py-1">
          <Link
            className="cursor-pointer"
            id="dropdownTable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="fa fa-ellipsis-v text-secondary"
              aria-hidden="true"
            ></i>
          </Link>
          <ul
            className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark"
            aria-labelledby="dropdownTable"
            data-popper-placement="bottom-start"
          >
            <li>
              <Link
                className="dropdown-item border-radius-md"
                // to={"/occassions/" + elem?._id}
                onClick={() => handleOpen(elem?._id)}
              >
                View
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <div className="container-fluid py-4">
      <div className="row my-4">
        <div className="col-md-12 mb-md-0 mb-4">
          {/* DISPLAY ERROR MESSAGE */}
          {alert?.errStatus && (
            <div
              className="alert alert-danger alert-dismissible fade show text-black"
              role="alert"
            >
              {alert?.errMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  setAlert({
                    errStatus: false,
                    successStatus: false,
                    errMessage: "",
                    successMessage: "",
                  });
                }}
              ></button>
            </div>
          )}

          {/* DISPLAY SUCCESS MESSAGE */}
          {alert?.successStatus && (
            <div
              className="alert alert-success alert-dismissible fade show text-black"
              role="alert"
            >
              {alert?.successMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  setAlert({
                    errStatus: false,
                    successStatus: false,
                    errMessage: "",
                    successMessage: "",
                  });
                }}
              ></button>
            </div>
          )}

          <div className="card">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-md-8">
                  <h6>Contact's List</h6>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                {<Datatable data={contactData} columns={columns} />}
              </div>
            </div>
            <Modal
              open={opneModal}
              onClose={handleClose}
              onOk={handleClose}
              onCancel={handleClose}
            >
              {contactData
                ?.filter((elem) => (elem?._id === id ? elem : ""))
                .map((formData) => (
                  <div key={formData._id} style={{ padding: 10 }}>
                    <p>
                      <strong>Name:</strong>
                      <br />
                      {formData?.name}
                    </p>
                    <p>
                      <strong>Mobile:</strong>
                      <br />

                      {formData?.mobile}
                    </p>
                    <p>
                      <strong>Query:</strong>
                      <br />
                      {formData?.query}
                    </p>
                  </div>
                ))}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
