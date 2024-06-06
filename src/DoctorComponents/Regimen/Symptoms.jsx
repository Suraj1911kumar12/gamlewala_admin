import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteItem } from "../../Apis/Setters/DeleteItem";
import Datatable from "../../Components/DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { Select } from "antd";
import { AddData } from "../../Apis/Setters/AddData";
import { EditData } from "../../Apis/Setters/EditData";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";

const Symptoms = () => {
  // USING CUSTOM SESSION HOOK
  const [setSession, getSession] = useSession();
  // GETTING AUTH TOKEN FROM SESSION
  const token = getSession("authorization");

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  // LISTING DATA STATE
  const [list, setList] = useState([]);
  // ADD DATA STATE
  const [addData, setAddData] = useState({
    name: "",
    type: "",
  });

  useEffect(() => {
    GetData({ url: "symtom", token: token })
    .then((res) => {
      setList(res.data.data.symtomList);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [alert]);

  // CHANGE CUSTOMER POPUP STATE
  const [contentStatus, setContentStatus] = useState(false);
  // CUSTOMER POPUP DETAILS STATE
  const [contentDetails, setContentDetails] = useState({
    name: "",
    type: "",
  });

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...list];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "type",
      key: "type",
      dataIndex: "type",
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
            className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
            aria-labelledby="dropdownTable"
            data-popper-placement="bottom-start"
          >
            <li
              onClick={() => {
                setContentStatus(!contentStatus);
                setContentDetails({
                  symtomId: elem?._id,
                  name: elem?.name,
                  type: elem?.type,
                });
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
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

  // HANDLING CATEGORY SELECTOR
  const handleCategory = (value) => {
    setAddData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  // HANDLING UPDATE CATEGORY SELECTOR
  const handleUpdatetionCategory = (value) => {
    setContentDetails((prev) => ({
      ...prev,
      type: value,
    }));
  };

  // API CALL TO ADD AN ITEM
  const addItem = (e) => {
    e.preventDefault();
    const credentials = { ...addData };

    AddData({ url: "symtom", cred: credentials, token: token })
      .then((res) => {
        if(res.data.status){
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)   
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
          setAlert({
            errStatus: false,
            successStatus: false,
            errMessage: "",
            successMessage: "",
          })
        }, 3000);
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

  // API CALL TO UPDATE AN ITEM
  const updateItem = (e) => {
    e.preventDefault();
    const credentials = { ...contentDetails };

    EditData({ url: "symtom", cred: credentials, token: token })
      .then((res) => {
        if(res.data.status){
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)   
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
          setAlert({
            errStatus: false,
            successStatus: false,
            errMessage: "",
            successMessage: "",
          })
        }, 3000);
        }
        setContentStatus(!contentStatus);
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

  // API CALL TO DELETE AN ITEM
  const deleteItem = (id) => {  
    DeleteData({ url: `symtom/${id}`, token: token })
      .then((res) => {
        if(res.data.status){
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)   
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
          setAlert({
            errStatus: false,
            successStatus: false,
            errMessage: "",
            successMessage: "",
          })
        }, 3000);
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

            {/* ADD ATTRIBUTE FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4>Add Symptom</h4>
                  <form onSubmit={addItem}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label
                            htmlFor="form-designation/name"
                            className="form-label"
                          >
                            Symptom
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="form-designation/name"
                            value={addData?.name}
                            onChange={(e) =>
                              setAddData({ ...addData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label
                            htmlFor="form-kit/symptom"
                            className="form-label"
                          >
                            Category
                          </label>
                          <Select
                            allowClear
                            size={"large"}
                            style={{ width: "100%" }}
                            placeholder="Select Category"
                            onChange={handleCategory}
                            options={[
                              {
                                label: "Skin",
                                value: "skin",
                              },
                              {
                                label: "Hair",
                                value: "hair",
                              },
                            ]}
                            className="p-0 mb-4"
                            value={addData?.type}
                            required
                          />
                        </div>
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

            {/* ATTRIBUTES LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Symptoms List</h6>
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
                    <h3 className="newsletter-heading">Symptom</h3>
                    <form onSubmit={updateItem}>
                      <div className="input-area">
                        <div className="input-div">
                          <input
                            name="name"
                            type="text"
                            value={contentDetails.name}
                            placeholder="Name"
                            onChange={(e) =>
                              setContentDetails({
                                ...contentDetails,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Select
                            allowClear
                            size={"large"}
                            style={{ width: "100%" }}
                            placeholder="Select Category"
                            onChange={handleUpdatetionCategory}
                            options={[
                              {
                                label: "Skin",
                                value: "skin",
                              },
                              {
                                label: "Hair",
                                value: "hair",
                              },
                            ]}
                            className="p-0 mb-4"
                            value={contentDetails?.type}
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

export default Symptoms;
