import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../DataTableComponent/Datatable";
import { Tag } from "antd";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import { AddData } from "../../Apis/Setters/AddData";
import useSession, { deleteSession } from "../../hooks/session";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { GetData } from "../../Apis/Getters/GetData";

const PackageList = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();

  //ORDER LIST STATE
  const [eventListData, setEventListData] = useState([]);

  const [deleteData, setDeleteData] = useState(false);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // GETTING TOKEN FROM SESSION
  let token = getSession("authorization");

  useEffect(() => {
     GetData({ url: "pooja-package", token: token })
      .then((res) => {
        setEventListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteData]);

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...eventListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "IMAGE",
      key: "image",
      dataIndex: "image",
      render: (_, elem) => (
        // <Link href="app-product.html" className="me-4">
          <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
            <img src={elem.image} width="40" height="40" alt="" />
          </div>
        // </Link>
      ),
    },
    {
      title: "Package NAME",
      key: "name",
      dataIndex: "name",
      ...columnSearchProps("name"),
    },
    {
      title: "MRP",
      key: "mrp",
      dataIndex: "mrp",
      ...columnSearchProps("mrp"),
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
      ...columnSearchProps("price"),
    },
    {
      title: "POOJA ITEMS",
      key: "elements",
      dataIndex: ["elements", "name"],
      ...columnSearchProps("elements"),
      render: (_, { elements }) => (
        <>
          {elements?.map((elements) => {
            return <Tag key={elements}>{elements.name}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "DESCRIPTION",
      key: "description",
      dataIndex: "description",
      ...columnSearchProps("description"),
    },
    {
      title: "STATUS",
      key: "isActive",
      dataIndex: "isActive",           
      render: (_, elem) => (
        <div className=" text-left px-2 py-1">
          <div className=" text-left">
            <div className="badge bg-primary">
              {elem.isActive ? "Active" : "Not Active"}
            </div>
          </div>
        </div>
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
                to={"/packages/elements/" + elem._id}
              >
                Add Pooja Elements
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item border-radius-md"
                to={"/packages/package/" + elem._id}
              >
                Update
              </Link>
            </li>
            <li
              onClick={() => {
                deleteItem(elem._id);
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
                Delete
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // API CALL METHOD TO DELETE AN ITEM
  const deleteItem = (id) => {
    DeleteData({ url: `pooja-package/delete/${id}`, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.status) {
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          });
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            });
          }, 1000);
          setDeleteData((prev) => !prev);
        }
      })
      .catch((err) => {
        if (err?.response?.status == "401") {
          deleteSession("authorization");
          window.location.href = `${process.env.REACT_APP_BASE_URL}`
        } else {
          window.scrollTo(0, 0);
          if (err?.response?.data?.msg) {
            console.log(err?.response?.data?.msg);
            setAlert({
              errStatus: true,
              successStatus: false,
              errMessage: err?.response?.data?.msg,
              successMessage: "",
            });
            setTimeout(() => {
              setAlert({
                errStatus: false,
                successStatus: false,
                errMessage: "",
                successMessage: "",
              });
            }, 2000);
          } else {
            console.log(err?.message);
            setAlert({
              errStatus: true,
              successStatus: false,
              errMessage: err?.message,
              successMessage: "",
            });
            setTimeout(() => {
              setAlert({
                errStatus: false,
                successStatus: false,
                errMessage: "",
                successMessage: "",
              });
            }, 2000);
          }
        }
      });
  };

  return (
    <React.Fragment>
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
                    <h6>Products List</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  {<Datatable data={data} columns={columns}/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PackageList;
