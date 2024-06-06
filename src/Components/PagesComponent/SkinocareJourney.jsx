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

const SkinocareJourney = () => {
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
  // ADD FAQ DETAILS STATE
  const [skinocareJourneyDetails, setSkinocareJourneyDetails] = useState({
    name: "",
    videoLink: "",
  });
  // HANDLING ADD FAQ DETAILS TO ABOVE STATE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setSkinocareJourneyDetails({
      ...skinocareJourneyDetails,
      [name]: value,
    });
  };

  const [skinocareJourneyList, setSkinocareJourneyList] = useState([]);
  const [deleteSkinocareData, setdeleteSkinocareData] = useState(true);
  const [addSkinocareJourneyData, setAddSkinocareJourneyData] = useState(true);
  const [updateSkinocareData, setUpdateSkinocareData] = useState(true);

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "skinocare-journey", token: token })
      .then((res) => {
        setSkinocareJourneyList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteSkinocareData, addSkinocareJourneyData, updateSkinocareData]);

  // CHANGE FAQ POPUP STATE
  const [skinocareStatus, setSkinocareStatus] = useState(false);
  // FAQ POPUP DETAILS STATE
  const [skinocareDetails, setSkinocareDetails] = useState({
    skinocareJourneyId: "",
    name: "",
    videoLink: "",
    isActive: "true",
  });

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...skinocareJourneyList];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
      ...columnSearchProps("name"),
    },
    {
      title: "VIDEO",
      key: "videoLink",
      dataIndex: "videoLink",
      ...columnSearchProps("videoLink"),
      render: (_, elem) => (
        <div>
          {/* <iframe
            width="560"
            height="315"
            src={elem.videoLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
          <a
            href={elem.videoLink}
            target="iframe_a"
            //onClick={() => video(elem.videoLink)}
          >
            {elem.videoLink}
          </a>
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
            <li
              onClick={() => {
                setSkinocareStatus(!skinocareStatus);
                setSkinocareDetails({
                  ...skinocareDetails,
                  skinocareJourneyId: elem._id,
                  name: elem.name,
                  videoLink: elem.videoLink,
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

  // ADD  API METHOD
  const add = (e) => {
    e.preventDefault();
    const credentials = { ...skinocareJourneyDetails };
    let token = getSession("authorization");
    AddData({ url: "skinocare-journey", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setSkinocareJourneyDetails({
          name: "",
          videoLink: "",
        });
        setAddSkinocareJourneyData((prev) => !prev);
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

  // UPDATE API METHOD
  const update = (e) => {
    e.preventDefault();
    const credentials = { ...skinocareDetails };
    let token = getSession("authorization");

    EditData({ url: "skinocare-journey", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.status) {
          setUpdateSkinocareData(!updateSkinocareData);
          setSkinocareStatus(!skinocareStatus);
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
    //let credentials = { faqId: id };

    let token = getSession("authorization");

    DeleteData({ url: `skinocare-journey/${id}`, token: token })
      .then((res) => {
        console.log(res.data);

        window.scrollTo(0, 0);
        if (res.data.status) {
          setdeleteSkinocareData((prev) => !prev);
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
            {/* ADD FAQ FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4>Skin O Care Journies</h4>
                  <form onSubmit={add}>
                    <div className="row">
                      <div className="row g-4 mb-4">
                        <div className="mb-4 col-md-6">
                          <label
                            htmlFor="form-coupon/title"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="form-product/name"
                            value={skinocareJourneyDetails.name}
                            onChange={handleDetails}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="form/url" className="form-label">
                            Video Link
                          </label>
                          <input
                            type="text"
                            name="videoLink"
                            className="form-control"
                            id="form/url"
                            value={skinocareJourneyDetails.videoLink}
                            onChange={handleDetails}
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

            {/* FAQs LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Journey List</h6>
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

      {/* VIEW & UPDATE FAQ */}
      {skinocareStatus && (
        <div className="password-popup">
          <div className="rts-newsletter-popup popup">
            <div
              className="newsletter-close-btn"
              onClick={() => setSkinocareStatus(!skinocareStatus)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div className="newsletter-inner popup-inner">
              <h3 className="newsletter-heading">Details</h3>
              <form onSubmit={update}>
                <div className="input-area">
                  <div className="input-div">
                    <input
                      name="name"
                      type="text"
                      value={skinocareDetails.name}
                      placeholder="Name"
                      onChange={(e) =>
                        setSkinocareDetails({
                          ...skinocareDetails,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <textarea
                      name="videoLink"
                      rows={5}
                      value={skinocareDetails.videoLink}
                      placeholder="Link"
                      onChange={(e) =>
                        setSkinocareDetails({
                          ...skinocareDetails,
                          videoLink: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="subscribe-btn">
                    Update{" "}
                    <i
                      class="fa fa-long-arrow-right ml--5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SkinocareJourney;
