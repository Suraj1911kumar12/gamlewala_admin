import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { EditData } from "../../Apis/Setters/EditData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { useParams } from "react-router-dom";
import { Select } from "antd";

const AddPoojaItems = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();

  const params = useParams();

  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [details, setDetails] = useState({
    packageId: params.id,
    element: []
  })

  const [packageDetail, setPackageDetail] = useState([])
  const [poojaItems, setPoojaItems] = useState([])

  const [addData, setAddData] = useState(true);

  let token = getSession("authorization");

  useEffect(() => {
    GetData({ url: `pooja-package/${params.id}`, token: token })
      .then((res) => {
        if (res?.data?.status) {
          setPackageDetail(res?.data?.data?.elements)
          setDetails({
            ...details,
            name: res?.data?.data?.name,
            element: res?.data?.data?.elements?.map((element) => {
              return element?._id
            }),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, [addData]);

  useEffect(() => {
    GetData({ url: `pooja-element`, token: token })
      .then((res) => {
        if (res?.data?.status) {
          setPoojaItems(res?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  //MAPPING SEGMENT OPTION FOR SELECT
  const poojaItemsList = poojaItems?.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  // HANDLING ADD ITEMS DETAILS TO ABOVE STATE
  const handleDetails = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        element: value,
      };
    });
  };
  // const [deleteData, setdeleteData] = useState(true);
  
  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...packageDetail];

  console.log(packageDetail);

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
      ...columnSearchProps("name"),
    },
    {
      title: "DESCRIPTION",
      key: "description",
      dataIndex: "description",
      ...columnSearchProps("description"),
    },
    // {
    //   title: "ACTION",
    //   key: "action",
    //   render: (elem) => (
    //     <div className=" text-left px-2 py-1">
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

  // ADD ITEMS API METHOD
  const addItems = (e) => {
    e.preventDefault();
    const credentials = { ...details };
    let token = getSession("authorization");
    AddData({ url: "pooja-package/replace-item-to-package", cred: credentials, token: token })
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
          setAddData((prev) => !prev);
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
  // const deleteItem = (id) => {
  //   let token = getSession("authorization");

  //   DeleteData({ url: `sub-category/delete/${id}`, token: token })
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
  //         // setdeleteData(!deleteData);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err?.response?.status == "401") {
  //         deleteSession("authorization");
  //         window.location.href = `${process.env.REACT_APP_BASE_URL}`
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
            {/* ADD SUBCATEGORY FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4 className="mb-4">Add Pooja Item</h4>
                  <form onSubmit={addItems}>
                    <div className="row">
                      <div className="mb-4 col-md-6">
                        <label
                          htmlFor="form-subcategory/question"
                          className="form-label"
                        >
                          Package Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="form-subcategory/name"
                          value={details.name}
                          readOnly
                        // onChange={handleDetails}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="form-productImage/thumbnail"
                          className="form-label"
                        >
                          Pooja Items
                        </label>
                        <Select
                          mode="multiple"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Select Segment"
                          onChange={handleDetails}
                          options={poojaItemsList}
                          className="p-0"
                          value={details?.element}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <input
                        type="submit"
                        className="btn btn-outline-primary btn-sm mb-0"
                        value="Save"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* ITEMS LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Pooja Items already in this package</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  {<Datatable data={data} columns={columns} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddPoojaItems;
