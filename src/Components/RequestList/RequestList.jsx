import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { EditData } from "../../Apis/Setters/EditData";

const RequestList = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [customerListData, setCustomerListData] = useState([]);
  const [deleteCustomer, setDeleteCustomer] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState(false);

//   useEffect(() => {
//     let token = getSession("authorization");

//     GetData({ url: "customers", token: token })
//       .then((res) => {
//         setCustomerListData(res.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [deleteCustomer, updateCustomer]);

  // CHANGE CUSTOMER POPUP STATE
  const [contentStatus, setContentStatus] = useState(false);
  // CUSTOMER POPUP DETAILS STATE
  const [contentDetails, setContentDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...customerListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
    //   title: "IMAGE",
    //   key: "image",
    //   dataIndex: "image",
    //   sorter: {
    //     compare: (a, b) => a.image - b.image,
    //     multiple: 3,
    //   },
    //   render: (_, elem) => (
    //     <Link href="app-product.html" className="me-4">
    //       <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
    //         <img src={elem.image} width="40" height="40" alt="" />
    //       </div>
    //     </Link>
    //   ),
    },
    {
      title: "User Name",
      key: "userName",
      dataIndex: "userName",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
      ...columnSearchProps("userName"),
    },
    {
      title: "Request",
      key: "request",
      dataIndex: "request",
      sorter: {
        compare: (a, b) => a.request - b.request,
        multiple: 3,
      },
      ...columnSearchProps("request"),
    },
    // {
    //   title: "MOBILE",
    //   key: "mobile",
    //   dataIndex: "mobile",
    //   sorter: {
    //     compare: (a, b) => a.mobile - b.mobile,
    //     multiple: 3,
    //   },
    //   ...columnSearchProps("mobile"),
    // },
    // {
    //   title: "ACTION",
    //   key: "action",
    //   render: (elem) => (
    //     <div className=" text-center px-2 py-1">
    //       <Link
    //         className="cursor-pointer"
    //         id="dropdownTable"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i
    //           className="fa fa-ellipsis-v text-secondary"
    //           aria-hidden="true"
    //         ></i>
    //       </Link>
    //       <ul
    //         className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark"
    //         aria-labelledby="dropdownTable"
    //         data-popper-placement="bottom-start"
    //       >
    //         <li>
    //           <Link
    //             className="dropdown-item border-radius-md"
    //             to={"/customers/customer/" + elem._id}
    //           >
    //             View
    //           </Link>
    //         </li>
    //         <li
    //           onClick={() => {
    //             setContentStatus(!contentStatus);
    //             setContentDetails({
    //               customerId: elem._id,
    //               name: elem.name,
    //               email: elem.email,
    //               mobile: elem.mobile,
    //             });
    //           }}
    //         >
    //           <Link className="dropdown-item border-radius-md" to="#">
    //             Update
    //           </Link>
    //         </li>
    //         <li
    //           onClick={() => {
    //             deleteItem(elem._id);
    //           }}
    //         >
    //           <Link className="dropdown-item border-radius-md" to="#">
    //             Delete
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   ),
    // },
  ];

  // UPDATE CUSTOMER DATA API METHOD
  const updateContent = (e) => {
    e.preventDefault();
    const credentials = { ...contentDetails };

    let token = getSession("authorization");
    EditData({ url: "customers", cred: credentials, token: token })
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
          setUpdateCustomer(!updateCustomer);
          setContentStatus(!contentStatus);
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

  // API CALL METHOD TO DELETE AN ITEM
  const deleteItem = (id) => {
    let token = getSession("authorization");
    DeleteData({ url: `customers/${id}`, token: token })
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
          setDeleteCustomer(!deleteCustomer);
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
                className="alert alert-danger alert-dismissible fade show text-white"
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
                className="alert alert-success alert-dismissible fade show text-white"
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

            {/* CUSTOMERS LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Request List</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  {<Datatable data={data} columns={columns} />}
                </div>
              </div>
            </div>

            {/* VIEW & UPDATE CUSTOMER DATA */}
            {contentStatus && (
              <div className="password-popup">
                <div className="rts-newsletter-popup popup">
                  <div
                    className="newsletter-close-btn"
                    onClick={() => setContentStatus(!contentStatus)}
                  >
                    <i className="fa fa-times"></i>
                  </div>
                  <div className="newsletter-inner popup-inner">
                    <h3 className="newsletter-heading">Details</h3>
                    <form onSubmit={updateContent}>
                      <div className="input-area">
                        <div className="input-div">
                          <input
                            name="email"
                            type="text"
                            value={contentDetails.email}
                            placeholder="Email"
                            onChange={(e) =>
                              setContentDetails({
                                ...contentDetails,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="input-div">
                          <input
                            name="phone"
                            type="tel"
                            value={contentDetails.mobile}
                            placeholder="Mobile"
                            onChange={(e) =>
                              setContentDetails({
                                ...contentDetails,
                                mobile: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <button type="submit" className="subscribe-btn">
                          Update{" "}
                          <i
                            className="fa fa-long-arrow-right ml--5"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RequestList;
