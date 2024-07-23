import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { DeleteItem } from "../../Apis/Setters/DeleteItem";
import { AddData } from "../../Apis/Setters/AddData";
import { Button, Checkbox, Select, Switch } from "antd";
import Datatable from "../DataTableComponent/Datatable";
import { CheckCircleFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";

const UserList = () => {
  const [deleteCategoryData, setDeleteCategoryData] = useState(false);

  //CATEGORIES LIST STATE
  const [userList, setUserList] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [details, setDetails] = useState({
    page: 1,
    count: 10
  })

  let token = getSession("authorization");
  useEffect(() => {

    getApi();
  }, []);
  const getApi = () => {
    const credentials = { ...details }
    AddData({ url: "become-a-partner/list", cred: credentials, token: token })
      .then((res) => {
        console.log(res);
        setUserList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //API CALL METHOD TO DELETE AN ITEM
  // const deleteCategory = (id) => {
  //   let token = getSession("authorization");
  //   DeleteData({ url: `user/delete/${id}`, token: token })
  //     .then((res) => {
  //       window.scrollTo(0, 0);
  //       if (res.data.status) {
  //         setAlert({
  //           successStatus: true,
  //           errStatus: false,
  //           successMessage: res?.data?.msg,
  //           errMessage: "",
  //         });
  //         setTimeout(() => {
  //           setAlert({
  //             errStatus: false,
  //             successStatus: false,
  //             errMessage: "",
  //             successMessage: "",
  //           });
  //         }, 1000);
  //         setDeleteCategoryData((prev) => !prev);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err?.response?.status == "401") {
  //         // deleteSession("authorization");
  //         // window.location.href = `${process.env.REACT_APP_BASE_URL}`
  //       } else {
  //         window.scrollTo(0, 0);
  //         if (err?.response?.data?.msg) {
  //           console.log(err?.response?.data?.msg);
  //           setAlert({
  //             errStatus: true,
  //             successStatus: false,
  //             errMessage: err?.response?.data?.msg,
  //             successMessage: "",
  //           });
  //           setTimeout(() => {
  //             setAlert({
  //               errStatus: false,
  //               successStatus: false,
  //               errMessage: "",
  //               successMessage: "",
  //             });
  //           }, 2000);
  //         } else {
  //           console.log(err?.message);
  //           setAlert({
  //             errStatus: true,
  //             successStatus: false,
  //             errMessage: err?.message,
  //             successMessage: "",
  //           });
  //           setTimeout(() => {
  //             setAlert({
  //               errStatus: false,
  //               successStatus: false,
  //               errMessage: "",
  //               successMessage: "",
  //             });
  //           }, 2000);
  //         }
  //       }
  //     });
  // };

  // MAPPING THE LIST OF FETCHED ITEMS
  // let columns = userList.map((elem, index) => {
  //   return (
  //     <tr key={index + 1}>
  //       <td className="align-middle">
  //         <div className=" text-left px-2 py-1">
  //           <div className=" text-left">
  //             <span className="text-sm">{elem?.type}</span>
  //           </div>
  //         </div>
  //       </td>
  //       <td className="align-middle">
  //         <div className=" text-left px-2 py-1">
  //           <div className=" text-left">
  //             <span className="text-sm">{elem?.segment?.name}</span>
  //           </div>
  //         </div>
  //       </td>
  //       <td>
  //         <div className="d-flex px-2 py-1">
  //           <div className="d-flex flex-column justify-content-center">
  //             <h6 className="mb-0 text-sm">
  //               <Link to="#">{elem?.name}</Link>
  //             </h6>
  //           </div>
  //         </div>
  //       </td>
  //       <td className="align-middle">
  //         <div className=" text-left px-2 py-1">
  //           <div className=" text-left">
  //             <span className="text-sm">{elem?.email}</span>
  //           </div>
  //         </div>
  //       </td>
  //       <td className="align-middle">
  //         <div className=" text-left px-2 py-1">
  //           <div className=" text-left">
  //             <span className="text-sm">{elem?.mobile}</span>
  //           </div>
  //         </div>
  //       </td>
  //       <td className="align-middle">
  //         <div className=" text-center px-2 py-1">
  //           <Link
  //             className="cursor-pointer"
  //             id="dropdownTable"
  //             data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //           >
  //             <i
  //               className="fa fa-ellipsis-v text-secondary"
  //               aria-hidden="true"
  //             ></i>
  //           </Link>
  //           <ul
  //             className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark"
  //             aria-labelledby="dropdownTable"
  //             data-popper-placement="bottom-start"
  //           >
  //             <li>
  //               <Link
  //                 className="dropdown-item border-radius-md"
  //                 to={"/notverifiedusers/user/" + elem._id}
  //               >
  //                 Details for Verification
  //               </Link>
  //             </li>
  //             <li
  //               onClick={() => {
  //                 deleteCategory(elem._id);
  //               }}
  //             >
  //               <Link className="dropdown-item border-radius-md" to="#">
  //                 Delete
  //               </Link>
  //             </li>
  //           </ul>
  //         </div>
  //       </td>
  //     </tr>
  //   );
  // });
  const handleApprove = (id) => {
    const credentials = {
      id: id
    }
    console.log(id);
    AddData({ url: "become-a-partner/approval", cred: credentials, token: token }).then((res) => {
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
          getApi()
        }, 2000);
      }
    }).catch((err) => {
      if (err?.response?.status == "401") {
        // deleteSession("authorization");
        // window.location.href = `${process.env.REACT_APP_BASE_URL}`
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

  }

  const columns = [

    {
      title: "name",
      dataIndex: ["name", "name"],
      key: "name",
      render: (_, elem) => (
        <>
          <div className="">
            <span className="text-sm">{elem?.name}</span>
          </div>
        </>
      ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      // ...columnSearchProps("price"),
    },
    {
      title: "Mobile",
      key: "Mobile",
      dataIndex: "mobile",
      // ...columnSearchProps("price"),
    },
    {
      title: "Active",
      key: "active",
      dataIndex: "isActive",
      render: (_, elem) => (
        <div className=" text-left px-2 py-1">
          <div className=" text-left">{elem.isActive ?
            <div className="badge text-success">{"Active"}</div>
            :
            <div className="badge text-danger">{"Not Active"}</div>}
          </div>
        </div>
      ),
    },
    {
      title: "Approve",
      key: "Approve",
      dataIndex: "isAdminApproved",
      render: (_, elem) => (
        <div className=" text-left px-2 py-1">
          <div className=" text-left">
            {/* <button onClick={() => handleApprove(elem?._id)} style={{ background: 'transparent', border: '1px solid black', borderRadius: '10px' }} >Approve</button> */}
            {/* <Switch value={elem?.isAdminApproved} onChange={() => handleApprove(elem?._id)} /> */}
            <div className={`checkbox-container ${elem.isAdminApproved ? 'checked' : ''}`}>
              <Checkbox onChange={() => handleApprove(elem?._id)}>
                Approve
              </Checkbox>
              <div className="checkmark-animation"></div>
            </div>

          </div>
        </div>
      ),
    },
    // {
    //   title: "VENDOR PRICE",
    //   key: "vendorPrice",
    //   dataIndex: "vendorPrice",
    //   ...columnSearchProps("vendorPrice"),
    // },

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
            {/* <li>
              <Link
                className="dropdown-item border-radius-md"
                to={"/products/product/" + elem._id}
              >
                Update
              </Link>
            </li>
            <li

            >
              <Link className="dropdown-item border-radius-md" to="#">
                Delete
              </Link>
            </li> */}
          </ul>
        </div>
      ),
    },
  ];
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
                  <div className="col-lg-6 col-7">
                    <h6>List</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">

                  {<Datatable data={userList} columns={columns} />}

                  {/* <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          User Type
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Segment
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Name
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Email
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Mobile
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {
                      list.length > 0 ?
                        <tbody>
                          {list}
                        </tbody>
                        :
                        <tbody>
                          <div style={{ width: '100%' }}>
                            <div className=" text-left px-2 py-1">
                              <div className=" text-left">
                                <span className="text-sm">No data Dound</span>
                              </div>
                            </div>
                          </div>
                        </tbody>
                    }
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserList;
